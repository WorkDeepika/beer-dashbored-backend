const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  email: { type: String, default: null },
  startDate: { type: String, default: null },
  startTime: { type: String, default: null },
  QRQ2: { type: String, default: null },
  name: { type: String, default: null },
  address: { type: String, default: null },
  contact: { type: Number, default: null },
  interviewerName: { type: String, default: null },
  interviewerId: { type: String, default: null },
  areaName: { type: String, default: null },
  areaCode: { type: String, default: null },
  latitude: { type: Number, default: null },
  longitude: { type: Number, default: null },
  language: { type: String, default: null },
  backST: { type: String, default: null },
  backSD: { type: String, default: null },

  QRQ3: [{ type: String }],
  QRQ4: { type: String, default: null },
  QRQ5: { type: String, default: null },
  agrGroup: { type: String, default: null },
  QRQ6: { type: String, default: null },
  QRQ7: { type: String, default: null },
  QRQ8: [{ type: String }],
  NCCS: { type: String, default: null },
  QRQ9: { type: String, default: null },
  QRQ10: [{ type: String }],
  QRQ11: [{ type: String }],
  QRQ11_other: { type: String, default: null },
  QRQ11A: [{ type: String }],
  QRQ11A_other: { type: String, default: null },
  QRQ12: [{ type: String }],
  QRQ12_other: { type: String, default: null },
  QRQ13: [{ type: String }],
  QRQ13_other: { type: String, default: null },

  QRQ14: { type: String, default: null },
  QRQ14_label: { type: String, default: null },
  RecruitmentPanel: { type: String, default: null },
  type: { type: String, default: null },
  panelNumber: { type: String, default: null },
  Panels: [{ type: String }],

  // Panel-wise most/least
  P1_QMQ1_most: { type: String, default: null },
  P1_QMQ1_least: { type: String, default: null },
  P2_QMQ1_most: { type: String, default: null },
  P2_QMQ1_least: { type: String, default: null },
  P3_QMQ1_most: { type: String, default: null },
  P3_QMQ1_least: { type: String, default: null },
  P4_QMQ1_most: { type: String, default: null },
  P4_QMQ1_least: { type: String, default: null },
  P5_QMQ1_most: { type: String, default: null },
  P5_QMQ1_least: { type: String, default: null },
  P6_QMQ1_most: { type: String, default: null },
  P6_QMQ1_least: { type: String, default: null },

  QRQ14A: { type: String, default: null },
  QRQ15: { type: String, default: null },

  QM1b: [{ type: String }],

  // QMQ8 mappings (arrays not string)
  QMQ8__1: [{ type: String }],
  QMQ8__2: [{ type: String }],
  QMQ8__3: [{ type: String }],
  QMQ8__4: [{ type: String }],
  QMQ8__5: [{ type: String }],
  QMQ8__6: [{ type: String }],
  QMQ8__7: [{ type: String }],
  QMQ8__8: [{ type: String }],
  QMQ8__9: [{ type: String }],
  QMQ8__10: [{ type: String }],
  QMQ8__11: [{ type: String }],
  QMQ8__12: [{ type: String }],
  QMQ8__13: [{ type: String }],
  QMQ8__14: [{ type: String }],
  QMQ8__15: [{ type: String }],
  QMQ8__16: [{ type: String }],
  QMQ8__17: [{ type: String }],

  // Ranking lowercase
  rank1: { type: String, default: null },
  rank2: { type: String, default: null },
  rank3: { type: String, default: null },
  rank4: { type: String, default: null },
  rank5: { type: String, default: null },
  rank6: { type: String, default: null },

  // Promo fields
  promo1: { type: String, default: null },
  promo2: { type: String, default: null },
  promo3: { type: String, default: null },
  promo4: { type: String, default: null },
  promo5: { type: String, default: null },
  promo6: { type: String, default: null },

  // QMQ10 per panel
  QMQ10_P1: [{ type: String }],
  QMQ10_P2: [{ type: String }],
  QMQ10_P3: [{ type: String }],
  QMQ10_P4: [{ type: String }],
  QMQ10_P5: [{ type: String }],
  QMQ10_P6: [{ type: String }],
  QMQ10_P6_other: { type: String, default: null },

  QRQ14_other: { type: String, default: null },

  duration: { type: String, default: null },
  endTime: { type: String, default: null },
  endDate: { type: String, default: null },
  backET: { type: String, default: null },
  backED: { type: String, default: null },

  latitude1: { type: Number, default: null },
  longitude1: { type: Number, default: null }

}, { timestamps: true });

const DataModel = mongoose.model("DataModel", dataSchema);
module.exports = DataModel;