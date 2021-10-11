const express = require("express");
const router = express.Router();
const {
  addNewReport,
  selectReportToCheck,
  deleteReportById
} = require("../controllers/report.controller");
const { checkToken } = require("../controllers/auth.controller");

router.post("/", checkToken, addNewReport);
router.get("/checkreport/:postId/:userId", checkToken, selectReportToCheck);
router.delete("/:postId/", checkToken, deleteReportById);

module.exports = router;
