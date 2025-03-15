import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./GroupCartChat.css";
import { useSelector } from "react-redux";

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

const MessageItem = ({ msg, isCurrentUser }) => (
  <div className={`message ${isCurrentUser ? "my-message" : "user-message"}`}>
    <img src={msg.senderId?.avatar?.url || "/default-avatar.png"} alt="User Avatar" className="avatar" />
    <div className="message-content">
      <span className="message-name">{msg.senderId?.name || "Unknown"}</span>
      <span className="message-text">{msg.text}</span>
    </div>
  </div>
);


const ChatInput = ({ message, setMessage, sendMessage }) => (
  <div className="chat-input">
    <input
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
      placeholder="Type a message..."
    />
    <button onClick={sendMessage}>Send</button>
  </div>
);

function Chat({ roomId }) {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const chatEndRef = useRef(null);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    const handlePreviousMessages = (messages) => setChat(messages);
    const handleMessage = (data) => setChat((prevChat) => [...prevChat, data]);

    socket.on("previousMessages", handlePreviousMessages);
    socket.on("message", handleMessage);

    return () => {
      socket.off("previousMessages", handlePreviousMessages);
      socket.off("message", handleMessage);
    };
  }, [roomId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("message", { roomId, text: message, senderId: user._id });
    setMessage("");
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {chat.map((msg, index) => (
          <MessageItem key={index} msg={msg} isCurrentUser={msg.senderId?._id === user._id} />
        ))}
        <div ref={chatEndRef}></div>
      </div>
      <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </div>
  );
}

export default Chat;
