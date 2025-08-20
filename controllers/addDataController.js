const DataModel = require('../models/dataModel');

const putData = async (req, res) => {
    try {
        // Validate input data
        let jsonData = req.body;
        if (!jsonData || Object.keys(jsonData).length === 0) {
            return res.status(400).json({
                message: 'Request body is empty. Please provide valid data.',
            });
        }
        const result = await DataModel.create(jsonData);

        res.status(201).json({
            message: 'Data inserted successfully',
            result,
        });
    } catch (error) {
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation error',
                error: error.message,
            });
        }

        // Handle unexpected errors
        res.status(500).json({
            message: 'Error inserting data',
            error: error.message,
        });
    }
};
// const addUser = async (req, res) => {
//     try {
//         // Validate input data
//         let jsonData = req.body;
//         if (!jsonData || Object.keys(jsonData).length === 0) {
//             return res.status(400).json({
//                 message: 'Request body is empty. Please provide valid data.',
//             });
//         }
//         const result = await User.create(jsonData);

//         res.status(201).json({
//             message: 'Data inserted successfully',
//             result,
//         });
//     } catch (error) {
//         // Handle Mongoose validation errors
//         if (error.name === 'ValidationError') {
//             return res.status(400).json({
//                 message: 'Validation error',
//                 error: error.message,
//             });
//         }

//         // Handle unexpected errors
//         res.status(500).json({
//             message: 'Error inserting data',
//             error: error.message,
//         });
//     }
// };
module.exports={ 
    putData,
    // addUser,
    // createOrUpdateProject
}
