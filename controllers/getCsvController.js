const DataModel = require('../models/dataModel');
const XLSX = require("xlsx");
const {s3Client}= require("../services/aws/s3");
const { PutObjectCommand} = require("@aws-sdk/client-s3");
const path = require('path');

//write bucket name
require("dotenv").config();

const exportDataToXLSX = async (req, res) => {
    try {
        // Step 1: Fetch data from MongoDB
        const data = await DataModel.find().lean();
        if (!data.length) {
            return res.status(404).json({ message: 'No data found' });
        }

        // Define the expected fields
        const expectedFields = [
            "_id",
            "email",
            "startDate",
            "startTime",
            "QRQ2",
            "name",
            "address",
            "contact",
            "interviewerName",
            "interviewerId",
            "areaName",
            "areaCode",
            "latitude",
            "longitude",
            "language",
            "backST",
            "backSD",
          
            "QRQ3",
            "QRQ4",
            "QRQ5",
            "agrGroup",
            "QRQ6",
            "QRQ7",
            "QRQ8",
            "NCCS",
            "QRQ9",
            "QRQ10",
            "QRQ11",
            "QRQ11_other",
            "QRQ11A",
            "QRQ11A_other",
            "QRQ12",
            "QRQ12_other",
            "QRQ13",
            "QRQ13_other",
          
            "QRQ14",
            "QRQ14_label",
            "RecruitmentPanel",
            "type",
            "panelNumber",
            "Panels",
          
            "P1_QMQ1_most",
            "P1_QMQ1_least",
            "P2_QMQ1_most",
            "P2_QMQ1_least",
            "P3_QMQ1_most",
            "P3_QMQ1_least",
            "P4_QMQ1_most",
            "P4_QMQ1_least",
            "P5_QMQ1_most",
            "P5_QMQ1_least",
            "P6_QMQ1_most",
            "P6_QMQ1_least",
          
            "QRQ14A",
            "QRQ15",
          
            "QMQ1b",
          
            // Panel 1 ratings
            "P1_QMQ2a",
            "P1_QMQ2a_label",
            "P1_QMQ2b",
            "P1_QMQ2b_label",
            "P1_QMQ2c",
            "P1_QMQ2c_label",
            "QMQ3_P1",
            "QMQ4_P1",
            "QMQ5_P1",
            "QMQ6_P1",
            "P1_QMQ7a",
            "P1_QMQ7a_label",
            "P1_QMQ7b",
            "P1_QMQ7b_label",
            "P1_QMQ7c",
            "P1_QMQ7c_label",
            "P1_QMQ7d",
            "P1_QMQ7d_label",
            "P1_QMQ7e",
            "P1_QMQ7e_label",
            "P1_QMQ7f",
            "P1_QMQ7f_label",
          
            // Panel 2 ratings
            "P2_QMQ2a",
            "P2_QMQ2a_label",
            "P2_QMQ2b",
            "P2_QMQ2b_label",
            "P2_QMQ2c",
            "P2_QMQ2c_label",
            "QMQ3_P2",
            "QMQ4_P2",
            "QMQ5_P2",
            "QMQ6_P2",
            "P2_QMQ7a",
            "P2_QMQ7a_label",
            "P2_QMQ7b",
            "P2_QMQ7b_label",
            "P2_QMQ7c",
            "P2_QMQ7c_label",
            "P2_QMQ7d",
            "P2_QMQ7d_label",
            "P2_QMQ7e",
            "P2_QMQ7e_label",
            "P2_QMQ7f",
            "P2_QMQ7f_label",
          
            // Ranking & QMQ8 mapping
            "QMQ8__1",
            "QMQ8__2",
            "QMQ8__3",
            "QMQ8__4",
            "QMQ8__5",
            "QMQ8__6",
            "QMQ8__7",
            "QMQ8__8",
            "QMQ8__9",
            "QMQ8__10",
            "QMQ8__11",
            "QMQ8__12",
            "QMQ8__13",
            "QMQ8__14",
            "QMQ8__15",
            "QMQ8__16",
            "QMQ8__17",
          
            "Rank1",
            "Rank2",
            "Rank3",
            "Rank4",
            "Rank5",
            "Rank6",
          
            "QMQ10",
            "QMQ10_other",

            "P3_QMQ2a",
            
            "P3_QMQ2a_label",
            "P3_QMQ2b",
            "P3_QMQ2b_label",
            "P3_QMQ2c",
            "P3_QMQ2c_label",
            "QMQ3_P3",
            "QMQ4_P3",
            "QMQ5_P3",
            "QMQ6_P3",
            "P3_QMQ7a",
            "P3_QMQ7a_label",
            "P3_QMQ7b",
            "P3_QMQ7b_label",
            "P3_QMQ7c",
            "P3_QMQ7c_label",
            "P3_QMQ7d",
            "P3_QMQ7d_label",
            "P3_QMQ7e",
            "P3_QMQ7e_label",
            "P3_QMQ7f",
            "P3_QMQ7f_label",

            "P4_QMQ2a",
            "P4_QMQ2a_label",
            "P4_QMQ2b",
            "P4_QMQ2b_label",
            "P4_QMQ2c",
            "P4_QMQ2c_label",
            "QMQ3_P4",
            "QMQ4_P4",
            "QMQ5_P4",
            "QMQ6_P4",
            "P4_QMQ7a",
            "P4_QMQ7a_label",
            "P4_QMQ7b",
            "P4_QMQ7b_label",
            "P4_QMQ7c",
            "P4_QMQ7c_label",
            "P4_QMQ7d",
            "P4_QMQ7d_label",
            "P4_QMQ7e",
            "P4_QMQ7e_label",
            "P4_QMQ7f",
            "P4_QMQ7f_label",

            "P5_QMQ2a",
            "P5_QMQ2a_label",
            "P5_QMQ2b",
            "P5_QMQ2b_label",
            "P5_QMQ2c",
            "P5_QMQ2c_label",
            "QMQ3_P5",
            "QMQ4_P5",
            "QMQ5_P5",
            "QMQ6_P5",
            "P5_QMQ7a",
            "P5_QMQ7a_label",
            "P5_QMQ7b",
            "P5_QMQ7b_label",
            "P5_QMQ7c",
            "P5_QMQ7c_label",
            "P5_QMQ7d",
            "P5_QMQ7d_label",
            "P5_QMQ7e",
            "P5_QMQ7e_label",
            "P5_QMQ7f",
            "P5_QMQ7f_label",

            "P6_QMQ2a",
            "P6_QMQ2a_label",
            "P6_QMQ2b",
            "P6_QMQ2b_label",
            "P6_QMQ2c",
            "P6_QMQ2c_label",
            "QMQ3_P6",
            "QMQ4_P6",
            "QMQ5_P6",
            "QMQ6_P6",
            "P6_QMQ7a",
            "P6_QMQ7a_label",
            "P6_QMQ7b",
            "P6_QMQ7b_label",
            "P6_QMQ7c",
            "P6_QMQ7c_label",
            "P6_QMQ7d",
            "P6_QMQ7d_label",
            "P6_QMQ7e",
            "P6_QMQ7e_label",
            "P6_QMQ7f",
            "P6_QMQ7f_label",

            "QRQ14_other",
          
            "duration",
            "endTime",
            "endDate",
            "backET",
            "backED",
          
            "latitude1",
            "longitude1",
          
            // Auto-added by mongoose
            "createdAt",
            "updatedAt",
            "__v"
          ];
          
          
          
          

        const formatDate = (dateString) => {
            if (!dateString || typeof dateString !== "string") {
                console.error("Invalid date input:", dateString);
                return null; // Return null or a default value
            }
        
            let delimiter = dateString.includes("/") ? "/" : dateString.includes("-") ? "-" : null;
        
            if (!delimiter) {
                console.error("Unexpected date format:", dateString);
                return null; // Handle unexpected formats
            }
        
            const parts = dateString.split(delimiter);
            
            if (parts.length !== 3) {
                console.error("Invalid date structure:", dateString);
                return null; // Ensure we get exactly 3 parts
            }
        
            let [part1, part2, year] = parts.map(part => part.trim());
        
            if (!year || isNaN(year)) {
                console.error("Invalid year in date:", dateString);
                return null;
            }
        
            // Determine if format is MM-DD-YYYY or DD-MM-YYYY
            let month, day;
            if (parseInt(part1) > 12) { 
                // If first part is greater than 12, it's likely DD-MM-YYYY
                day = part1;
                month = part2;
            } else {
                // Otherwise, assume it's MM-DD-YYYY
                month = part1;
                day = part2;
            }
        
            if (!month || !day || isNaN(month) || isNaN(day)) {
                console.error("Invalid day/month in date:", { month, day, year });
                return null;
            }
        
            return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
        };
        

        // Step 2: Format the data and enforce the correct field order
        const formattedData = data.map(row => {
            const orderedRow = {};
            expectedFields.forEach(field => {
                if (field === "Date" ) {
                    orderedRow[field] = formatDate(row[field]);
                } else if (field === "_id") {
                    // Convert _id to a string
                    orderedRow[field] = row[field] ? row[field].toString() : null;
                }else if (Array.isArray(row[field])) {
                    // Convert arrays to a comma-separated string
                    orderedRow[field] = row[field].join(", ");
                } else {
                    orderedRow[field] = row.hasOwnProperty(field) ? row[field] : null;
                }
            });
            return orderedRow;
        });
        // Step 1: Create a worksheet with formatted data
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        // Step 3: Add `expectedFields` starting at `AY2`
        XLSX.utils.sheet_add_aoa(worksheet, [expectedFields], { origin: "A1" });

        // Step 4: Create a workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');


        // Step 4: Convert the workbook to a buffer
        const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        const date = new Date();
        //console.log(date)
        const optionsDate = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Asia/Kolkata',
        };

        const optionsTime = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Use 24-hour format
        timeZone: 'Asia/Kolkata',
        };

        // Format the date as YYYY-MM-DD
        const formattedDate = new Intl.DateTimeFormat('en-US', optionsDate)
        .format(date)
        .replace(/\//g, '-');

        // Format the time as HH-MM-SS
        const formattedTime = new Intl.DateTimeFormat('en-US', optionsTime)
        .format(date)
        .replace(/:/g, '-');
        
          // Combine date and time for unique naming
          const fileName = `Beer-survey-${formattedDate}-${formattedTime}.xlsx`;
        const uploadParams = {
            Bucket: process.env.BUCKET_NAME, // Replace with your bucket name
            Key: `xlsx/${fileName}`,
            Body: excelBuffer,
            ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        };

        try {
            const command = new PutObjectCommand(uploadParams);
            const result = await s3Client.send(command);
            console.log('Excel file uploaded to S3:', result);

            return res.status(200).json({
                message: 'Excel file uploaded successfully to S3',
                downloadUrl: `https://${uploadParams.Bucket}.s3.us-east-1.amazonaws.com/xlsx/${fileName}`,
            });
        } catch (err) {
            console.error('Error uploading Excel file to S3:', err);
            return res.status(500).json({
                message: 'Error uploading Excel file to S3',
                error: err.message,
            });
        }
    } catch (error) {
        console.error('Error exporting data to Excel:', error);
        return res.status(500).json({ message: 'An error occurred while exporting data to Excel' });
    }
};
module.exports = { 
    exportDataToXLSX
};
