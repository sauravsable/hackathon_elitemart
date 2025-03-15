require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("./logger");
const morgan = require("morgan");
const connectDataBase = require("./database");
const PORT = process.env.PORT || 5000;
const Message =  require('./models/messageModel');
const errorMiddleWare = require("./middleware/error");
const { Kafka, logLevel } =  require("kafkajs");

const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);

// socket io server cors
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

// cors
app.use(
  cors({
    origin: ["http://localhost:3000"],
    origin: true,
    credentials: true,
  })
);

// express json 
app.use(express.json());

// express sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    },
  })
);

// cookie parser middleware 
app.use(cookieParser());

// database connection 
connectDataBase();

// morgan to get logs
const morganFormat = ":method :url :status :response-time ms";
app.use(morgan(morganFormat, { stream: logger.stream }));

// Middleware for handling errors
app.use(logger.errorLogger);

// get api to 
app.get("/", (req, res) => {
  res.send("server is running");
});

// Routes
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/paymentRoute");
const adminRoute = require("./routes/adminRoute");
const cartRoute = require("./routes/cartRoute");

app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);
app.use("/api/v1", adminRoute);
app.use("/api/v1", cartRoute);

//Middleware for error
app.use(errorMiddleWare);

// kafka setup
const kafka = new Kafka({
  clientId: "cart-app",
  brokers: ["10.22.2.199:9092"],
  logLevel: logLevel.INFO,
});

const admin = kafka.admin();
const producer = kafka.producer();
const kafkaConsumers = new Map();

//socket.io logic
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("joinRoom", async (roomId) => {
      try {
          socket.join(roomId);
          console.log(`User joined cart room: ${roomId}`);

          const messages = await Message.find({ roomId }).populate("senderId", "name avatar");;
          
          socket.emit("previousMessages", messages);

          if (!kafkaConsumers.has(roomId)) {
              const consumer = kafka.consumer({ groupId: `cart-group-${roomId}` });
              await consumer.connect();
              await consumer.subscribe({ topic: roomId });

              consumer.run({
                  eachMessage: async ({ topic, message }) => {
                      const parsedMessage = JSON.parse(message.value.toString());
                      console.log(`Received Kafka message for ${topic}: ${parsedMessage.text}`);

                      const newMessage = new Message(parsedMessage);
                      await newMessage.save();

                      const populatedMessage = await newMessage.populate("senderId", "name avatar");

                      io.to(topic).emit("message", populatedMessage);
                  },
              });

              kafkaConsumers.set(roomId, consumer);
          }
      } catch (error) {
          console.error("Error loading previous messages:", error);
      }
  });

  socket.on("message", async (data) => {
      try {
          const { roomId, text, senderId } = data;

          const newMessage = {
              roomId,
              text,
              senderId,
              timestamp: new Date(),
          };

          await producer.send({
              topic: roomId,
              messages: [{ value: JSON.stringify(newMessage) }],
          });

          console.log("Message sent to Kafka:", newMessage);
      } catch (error) {
          console.error("Error sending message:", error);
      }
  });

  socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
  });
});

// listen to server
httpServer.listen(PORT, async () => {
  await admin.connect();
  await producer.connect();
  console.log(`server is running on ${PORT}`);
});
