// models/PanelCount.js
const mongoose = require('mongoose');

const PanelCountSchema = new mongoose.Schema({
  panelId: { type: Number, required: true, unique: true },
  count: { type: Number, default: 0 }
});

module.exports = mongoose.model('PanelCount', PanelCountSchema);
