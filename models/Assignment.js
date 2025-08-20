// models/Assignment.js
// One row per (projectId, respondentId) = all 6 questions’ 4 image keys each
const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  RespondentID: { type: Number, required: true },
  TaskID: { type: Number, required: true },
  Item_1: { type: String, required: true },
  Item_2: { type: String, required: true },
  Item_3: { type: String, required: true },
  Item_4: { type: String, required: true },
  type: { type: String, required: true }
}, { timestamps: true });

// Optional: prevent duplicates for same RespondentID & TaskID
// AssignmentSchema.index({ RespondentID: 1, TaskID: 1 }, { unique: true });

module.exports = mongoose.model('Assignment', AssignmentSchema);

