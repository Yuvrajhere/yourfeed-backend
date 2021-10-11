const express = require("express");
const router = express.Router();
const {
  addNewLike,
  deleteLikeById,
  selectLikeToCheck,
} = require("../controllers/like.controller");
const { checkToken } = require("../controllers/auth.controller");

router.post("/", checkToken, addNewLike);
router.get("/checklike/:postId/:userId", checkToken, selectLikeToCheck);
router.delete("/:postId/:userId", checkToken, deleteLikeById);

module.exports = router;
