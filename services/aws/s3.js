require("dotenv").config(); 
const { S3Client } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    // endpoint: `https://s3.${process.env.AWS_REGION}.amazonaws.com`, // Region-specific endpoint
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    requestTimeout: 100000, // Set the timeout in milliseconds (e.g., 60000ms = 1 minute)
    maxAttempts: 3, // Retry up to 3 times on failure
});

module.exports = { s3Client };
