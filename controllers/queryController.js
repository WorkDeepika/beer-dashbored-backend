const DataModel = require('../models/dataModel');

const getSamplePlan = async (req, res) => {
  const result = await DataModel.aggregate([
    {
      // Exclude test records
      $match: {
        $or: [
          { isTest: { $exists: false } },   // no isTest field
          { isTest: null },                 // null means false
          { isTest: { $ne: "true" } }              // keep only those explicitly marked as "false"
        ]
      }
    },
    {
      $facet: {
        // ✅ Main sample breakdown
        samplePlan: [
          {
            $group: {
              _id: "$RecruitmentPanel",
              total: { $sum: 1 },
              nccsA: {
                $sum: {
                  $cond: [{ $in: ["$NCCS", ["A1", "A2"]] }, 1, 0]
                }
              },
              nccsB: {
                $sum: {
                  $cond: [{ $in: ["$NCCS", ["B1", "B2"]] }, 1, 0]
                }
              },
              age21_25: {
                $sum: {
                  $cond: [
                    { $in: ["$agrGroup", ["21-24 years", "21-25 years"]] },
                    1,
                    0
                  ]
                }
              },
              age26_30: {
                $sum: {
                  $cond: [
                    { $in: ["$agrGroup", ["25-30 years", "26-30 years"]] },
                    1,
                    0
                  ]
                }
              },
              age31_40: {
                $sum: {
                  $cond: [
                    { $in: ["$agrGroup", ["31-40 years", "31-35 years", "36-40 years"]] },
                    1,
                    0
                  ]
                }
              },
              male: {
                $sum: { $cond: [{ $eq: ["$QRQ2", "1"] }, 1, 0] }
              },
              female: {
                $sum: { $cond: [{ $eq: ["$QRQ2", "2"] }, 1, 0] }
              }
            }
          }
        ],

        // ✅ QRQ14 selections (unique per respondent)
        rq14Selections: [
          {
            $group: {
              _id: {
                panel: "$RecruitmentPanel",
                respondent: "$_id",   // or respondentId field
                brand: "$QRQ14"       // ✅ use code instead of label
              }
            }
          },
          // Step 2: count unique respondents per brand
          {
            $group: {
              _id: {
                panel: "$_id.panel",
                brand: "$_id.brand"
              },
              count: { $sum: 1 }
            }
          },
          // Step 3: reshape by panel
          {
            $group: {
              _id: "$_id.panel",
              brands: {
                $push: { brand: "$_id.brand", count: "$count" }
              }
            }
          }
        ]
      }
    }
  ]);
      
    const panels = [
      "Tuborg Green (TBG)",
      "Carlsberg Elephant (CBE)",
      "Tuborg Classic (TBC)",
      "Carlsberg Smooth (CBS)",
      "Tuborg Ice Draft (TBI)",
      "1664 Blanc (BLC)"
    ];
  
    let finalResult = {};
  
    panels.forEach(panel => {
      const panelData = result[0].samplePlan.find(r => r._id === panel) || {};
      const rq14Data = result[0].rq14Selections.find(r => r._id === panel) || { brands: [] };
  
      finalResult[panel] = {
        total: panelData.total || 0,
        nccs: {
          A: panelData.nccsA || 0,
          B: panelData.nccsB || 0
        },
        age: {
          "21-25 years": panelData.age21_25 || 0,
          "26-30 years": panelData.age26_30 || 0,
          "31-40 years": panelData.age31_40 || 0
        },
        gender: {
          Male: panelData.male || 0,
          Female: panelData.female || 0
        },
        rq14Selections: rq14Data   // ✅ Add brands + counts here
      };
    });
  
    return res.status(200).json({"finalResult" : finalResult});
};
  
  module.exports={
    getSamplePlan
};