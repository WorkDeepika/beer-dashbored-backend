const DataModel = require('../models/dataModel');

const getSamplePlan = async (req, res) => {
    const result = await DataModel.aggregate([
        {
          $facet: {
            // Total sample count per RecruitmentPanel
            totalSamples: [
              { $group: { _id: "$RecruitmentPanel", count: { $sum: 1 } } }
            ],
      
            // NCCS breakdown (A, B)
            nccs: [
              {
                $group: {
                  _id: {
                    panel: "$RecruitmentPanel",
                    nccs: {
                      $cond: [
                        { $in: ["$NCCS", ["A1", "A2"]] },
                        "A",
                        "B"
                      ]
                    }
                  },
                  count: { $sum: 1 }
                }
              }
            ],
      
            // Age breakdown
            age: [
              {
                $group: {
                  _id: { panel: "$RecruitmentPanel", age: "$agrGroup" },
                  count: { $sum: 1 }
                }
              }
            ],
      
            // Gender breakdown
            gender: [
              {
                $group: {
                  _id: {
                    panel: "$RecruitmentPanel",
                    gender: {
                      $cond: [{ $eq: ["$QRQ2", "1"] }, "Male", "Female"]
                    }
                  },
                  count: { $sum: 1 }
                }
              }
            ]
          }
        }
      ]);
      
    // 🔹 Restructure output in frontend-friendly format
    const panels = [
      "Tuborg Green (TBG)",
      "Carlsberg Smooth (CBS)",
      "Tuborg Classic",
      "Carlsberg Smooth",
      "Tuborg Ice Draft",
      "1664 Blanc (BLC)"
    ];
  
    let finalResult = {};
  
    panels.forEach(panel => {
      finalResult[panel] = {
        total: result[0].totalSamples.find(r => r._id === panel)?.count || 0,
        nccs: {
          A: result[0].nccs.find(r => r._id.panel === panel && r._id.nccs === "A")?.count || 0,
          B: result[0].nccs.find(r => r._id.panel === panel && r._id.nccs === "B")?.count || 0,
        },
        age: {
          "21-25 years": result[0].age.find(r => r._id.panel === panel && r._id.age === "21-24 years")?.count || 0,
          "26-30 years": result[0].age.find(r => r._id.panel === panel && r._id.age === "25-30 years")?.count || 0,
          "31-40 years": result[0].age.find(r => r._id.panel === panel && r._id.age === "31-40 years")?.count || 0,
        },
        gender: {
          Male: result[0].gender.find(r => r._id.panel === panel && r._id.gender === "Male")?.count || 0,
          Female: result[0].gender.find(r => r._id.panel === panel && r._id.gender === "Female")?.count || 0,
        }
      }
    });
  
    return res.status(200).json({"finalResult" : finalResult});
};

  module.exports={
    getSamplePlan
};