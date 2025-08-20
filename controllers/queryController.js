const DataModel = require('../models/dataModel');

// const getSamplePlan = async (req, res) => {
//     const result = await DataModel.aggregate([
//         {
//           $facet: {
//             // Total sample count per RecruitmentPanel
//             totalSamples: [
//               { $group: { _id: "$RecruitmentPanel", count: { $sum: 1 } } }
//             ],
      
//             // NCCS breakdown (A, B)
//             nccs: [
//               {
//                 $group: {
//                   _id: {
//                     panel: "$RecruitmentPanel",
//                     nccs: {
//                       $cond: [
//                         { $in: ["$NCCS", ["A1", "A2"]] },
//                         "A",
//                         "B"
//                       ]
//                     }
//                   },
//                   count: { $sum: 1 }
//                 }
//               }
//             ],
      
//             // Age breakdown
//             age: [
//               {
//                 $group: {
//                   _id: { panel: "$RecruitmentPanel", age: "$agrGroup" },
//                   count: { $sum: 1 }
//                 }
//               }
//             ],
      
//             // Gender breakdown
//             gender: [
//               {
//                 $group: {
//                   _id: {
//                     panel: "$RecruitmentPanel",
//                     gender: {
//                       $cond: [{ $eq: ["$QRQ2", "1"] }, "Male", "Female"]
//                     }
//                   },
//                   count: { $sum: 1 }
//                 }
//               }
//             ],
//             rq14Selections: [
//                 {
//                   $group: {
//                     _id: {
//                       panel: "$RecruitmentPanel",
//                       brand: "$QRQ14_label"
//                     },
//                     count: { $sum: 1 }
//                   }
//                 },
//                 {
//                   $group: {
//                     _id: "$_id.panel",
//                     brands: {
//                       $push: { brand: "$_id.brand", count: "$count" }
//                     }
//                   }
//                 }
//             ]
//           }
//         }
//       ]);
      
//     // 🔹 Restructure output in frontend-friendly format
//     const panels = [
//       "Tuborg Green (TBG)",
//       "Carlsberg Smooth (CBS)",
//       "Tuborg Classic",
//       "Carlsberg Smooth",
//       "Tuborg Ice Draft",
//       "1664 Blanc (BLC)"
//     ];
  
//     let finalResult = {};
  
//     panels.forEach(panel => {
//       finalResult[panel] = {
//         total: result[0].totalSamples.find(r => r._id === panel)?.count || 0,
//         nccs: {
//           A: result[0].nccs.find(r => r._id.panel === panel && r._id.nccs === "A")?.count || 0,
//           B: result[0].nccs.find(r => r._id.panel === panel && r._id.nccs === "B")?.count || 0,
//         },
//         age: {
//           "21-25 years": result[0].age.find(r => r._id.panel === panel && r._id.age === "21-24 years")?.count || 0,
//           "26-30 years": result[0].age.find(r => r._id.panel === panel && r._id.age === "25-30 years")?.count || 0,
//           "31-40 years": result[0].age.find(r => r._id.panel === panel && r._id.age === "31-40 years")?.count || 0,
//         },
//         gender: {
//           Male: result[0].gender.find(r => r._id.panel === panel && r._id.gender === "Male")?.count || 0,
//           Female: result[0].gender.find(r => r._id.panel === panel && r._id.gender === "Female")?.count || 0,
//         },
//         rq14Selections: rq14Data.brands 
//       }
//     });
  
//     return res.status(200).json({"finalResult" : finalResult});
// };
const getSamplePlan = async (req, res) => {
    const result = await DataModel.aggregate([
      {
        $facet: {
          // ✅ Main sample breakdown (faster version I shared earlier)
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
                    $cond: [{ $eq: ["$agrGroup", "21-24 years"] }, 1, 0]
                  }
                },
                age26_30: {
                  $sum: {
                    $cond: [{ $eq: ["$agrGroup", "25-30 years"] }, 1, 0]
                  }
                },
                age31_40: {
                  $sum: {
                    $cond: [{ $eq: ["$agrGroup", "31-40 years"] }, 1, 0]
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
  
          // ✅ New breakdown for QRQ14 selections
          rq14Selections: [
            {
              $group: {
                _id: {
                  panel: "$RecruitmentPanel",
                  brand: "$QRQ14_label"
                },
                count: { $sum: 1 }
              }
            },
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
    
  
    // 🔹 Prepare clean response
    const panels = [
      "Tuborg Green",
      "Carlsberg Elephant",
      "Tuborg Classic",
      "Carlsberg Smooth",
      "Tuborg Ice Draft",
      "1664 Blanc"
    ];
  
    let finalResult = {};
  
    panels.forEach(panel => {
      const panelData = result[0].samplePlan.find(r => r._id === panel) || {};
    //   const rq14Data = result[0].rq14Selections.find(r => r._id === panel) || { brands: [] };
  
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
        rq14Selections: result[0].rq14Selections   // ✅ Add brands + counts here
      };
    });
  
    return res.status(200).json({"finalResult" : finalResult});
  };
  
  module.exports={
    getSamplePlan
};