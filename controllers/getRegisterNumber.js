const PanelCount = require('../models/panelCountModel');
const getRegisterNumber = async (req, res) => {
    try {
      const panelId = parseInt(req.params.panelId, 10);
  
      if (panelId < 1 || panelId > 6) {
        return res.status(400).json({ error: "Invalid panel ID" });
      }
  
      // Atomic increment but only if count < 100
      const panel = await PanelCount.findOneAndUpdate(
        { panelId, count: { $lt: 100 } },
        { $inc: { count: 1 } },
        { new: true }
      );
  
      if (!panel) {
          console.log(panel)
        return res.status(400).json({ error: "Maximum registrations reached for this panel" });
      }
  
      return res.json({ registrationNumber: panel.count });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
}
module.exports={
    getRegisterNumber
}