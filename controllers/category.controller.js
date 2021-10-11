const {
  selectCategories
} = require("../services/category.service");

// const addNewLike = (req, res) => {
//   const body = req.body;
//   insertLike(body, (err, results) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({
//         success: false,
//         message: "Database connection error",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       results: results,
//     });
//   });
// };

const selectAllCategories = (req, res) => {
  selectCategories((err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Database connection error",
      });
    }
    return res.status(200).json({
      success: true,
      results: results,
    });
  });
};

// const deleteLikeById = (req, res) => {
//   const data = {
//     post_id: req.params.postId,
//     liked_by_user_id: req.params.userId
//   }
//   deleteLike(data, (err, results) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     if (!results) {
//       return res.json({
//         success: false,
//         message: "Like not found",
//       });
//     }
//     return res.json({
//       success: true,
//       message: "Like deleted successfully",
//     });
//   });
// };

module.exports = {
  selectAllCategories
};
