const AWS = require("aws-sdk");
const { sendMail } = require("./mail");

// AWS SQS configuration
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const sqs = new AWS.SQS();
const QUEUE_URL = process.env.AWS_SQS_QUEUE_URL;

// SQS function that checks queue every minute
const processQueue = async () => {
    try {
        console.log("Polling for new email jobs...");
        const params = {
            QueueUrl: QUEUE_URL,
            MaxNumberOfMessages: 10,
            WaitTimeSeconds: 10
        };

        const data = await sqs.receiveMessage(params).promise();

        if (!data.Messages || data.Messages.length === 0) {
            return;
        }

        for (const message of data.Messages) {
            const emailData = JSON.parse(message.Body);
            console.log(`Processing email for: ${emailData.email}`);

            try {
                await sendMail({email :emailData.email, subject:emailData.subject, html:emailData.html});
                await sqs.deleteMessage({
                    QueueUrl: QUEUE_URL,
                    ReceiptHandle: message.ReceiptHandle
                }).promise();

                console.log(`Email sent successfully to ${emailData.email}`);
            } catch (err) {
                console.error(`Failed to send email to ${emailData.email}:`, err);
            }
        }
    } catch (error) {
        console.error("Error processing queue:", error);
    }
};

setInterval(processQueue, 1000000);

console.log("Worker started. Listening for email jobs...");
