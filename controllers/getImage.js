const Assignment = require('../models/Assignment');
const TYPE_FOLDER_MAP = {
    TBG: 'Tuborg Green (TBG)',
    TBI: 'Tuborg Ice Draft (TBI)',
    TBC: 'Tuborg Classic (TBC)',
    CBS: 'Carlsberg Smooth (CBS)',
    CBE: 'Carlsberg Elephant (CBE)',
    BLC: '1664 Blanc (BLC)'
  };
  
  const BASE_URL = 'https://stimulus-coded-images.s3.us-east-1.amazonaws.com/STIMULUS+CODED+IMAGE/STIMULUS+CODED+IMAGE';
  
  const getImagesForRespondent = async (req, res) => {
    try {
      const { respondentId, taskId, type } = req.body;
  
      // Validate inputs
      if (!respondentId || !taskId || !type) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: respondentId, taskId, and type are required.',
          data: []
        });
      }
  
      // Validate type
      const folderName = TYPE_FOLDER_MAP[type];
      if (!folderName) {
        return res.status(400).json({
          success: false,
          error: `Invalid type: ${type}`,
          data: []
        });
      }
  
      // Find the assignment
      const assignment = await Assignment.findOne({
        RespondentID: respondentId,
        TaskID: taskId,
        type
      });
  
      if (!assignment) {
        return res.status(404).json({
          success: false,
          error: `No assignment found for RespondentID=${respondentId}, TaskID=${taskId}, type=${type}`,
          data: []
        });
      }
  
      // Ensure all items exist
      const items = [assignment.Item_1, assignment.Item_2, assignment.Item_3, assignment.Item_4];
      if (items.some(item => !item)) {
        return res.status(422).json({
          success: false,
          error: 'One or more item values are missing in the assignment record.',
          data: []
        });
      }
  
      // Build URLs
      const urls = items.map(item =>
        `${BASE_URL}/${encodeURIComponent(folderName)}/${encodeURIComponent(item)}.jpg`
      );
  
      return res.json({
        success: true,
        error: null,
        data: urls, 
        names : items
      });
  
    } catch (err) {
      console.error('Error in getImagesForRespondent:', err);
      return res.status(500).json({
        success: false,
        error: 'Internal server error while fetching images.',
        data: []
      });
    }
  };
  
  module.exports = { getImagesForRespondent };
  