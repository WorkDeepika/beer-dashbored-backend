
// initPanels.js
const mongoose = require('mongoose');
const PanelCount = require('../../models/panelCountModel');
// require("dotenv").config();
mongoose.connect("mongodb+srv://iwintuDatabase:Harekrishna@iwintu.fehuq.mongodb.net/beerSurvey", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    for (let i = 1; i <= 6; i++) {
      await PanelCount.updateOne(
        { panelId: i },
        { $setOnInsert: { count: 0 } },
        { upsert: true }
      );
    }
    console.log("Panels initialized");
    process.exit();
  })
  .catch(err => console.error(err));
