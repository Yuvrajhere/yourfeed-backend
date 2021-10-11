const express = require("express");
const router = express.Router();
const {
  selectAllCategories
} = require("../controllers/category.controller");
const { checkToken } = require("../controllers/auth.controller");

// router.post("/", checkToken, addNewLike);
router.get("/", checkToken, selectAllCategories);
// router.delete("/:postId/:userId", checkToken, deleteLikeById);

module.exports = router;
