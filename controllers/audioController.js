// const {  PutObjectCommand } =require("@aws-sdk/client-s3");
// const { s3Client } =require("../services/aws/s3");
// require("dotenv").config();
// const getAudioUrlController = async (req, res) => {
//     const audioFile = req.file;

//     if (!audioFile) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }
//     const buffer= audioFile.buffer;
//     const fileName = `data-${Date.now()}.wav`;
//     const bucketName= process.env.BUCKET_NAME 
//     // Ensure the MIME type is set correctly for the audio Blob
//     const params = {
//       Bucket: process.env.BUCKET_NAME,          // S3 bucket name
//       Key: `recordings/${fileName}`,                // The file path/name inside the S3 bucket
//       Body: buffer,                // The audio Blob content
//       ContentType: audioFile.mimetype, // MIME type of the audio (e.g., 'audio/wav')
//     };
  
//     try {
//       // Upload the audio file using PutObjectCommand
//       const command = new PutObjectCommand(params);
//       await s3Client.send(command);
  
//       // Construct the public URL for the uploaded file
//       const fileUrl = `https://${bucketName}.s3.eu-north-1.amazonaws.com/recordings/${fileName}`;
      
//       // Send the URL as a response to the API caller
//       return res.status(200).json({ fileUrl });
//     } catch (error) {
//       console.error('Error uploading audio blob to S3:', error);
//       throw error; // Propagate the error
//     }
// };
// module.exports={
//   getAudioUrlController
// }
  