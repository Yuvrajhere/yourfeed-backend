const {
  insertReport,
  selectReport,
  deleteReport
} = require("../services/report.service");

const addNewReport = (req, res) => {
  const body = req.body;
  insertReport(body, (err, results) => {
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

const selectReportToCheck = (req, res) => {
  const data = {
    post_id: req.params.postId,
    reported_by_user_id: req.params.userId
  }
  selectReport(data, (err, results) => {
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

const deleteReportById = (req, res) => {
  const post_id = req.params.postId;
    
  deleteReport(post_id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: false,
        message: "Report not found",
      });
    }
    return res.json({
      success: true,
      message: "Report deleted successfully",
    });
  });
};

module.exports = {
  addNewReport,
  selectReportToCheck,
  deleteReportById
};
