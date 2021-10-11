const express = require("express");
const router = express.Router();
const {
  addNewUser,
  getAllUsers,
  getUserByUserId,
  updateUserByUserId,
  updateUserImageByUserId,
  deleteUserByUserId,
  removeUserImageByUserId
} = require("../controllers/user.controller");
const { checkToken } = require("../controllers/auth.controller");
const { upload } = require("../config/multer-config");

router.post("/", addNewUser);
router.get("/", getAllUsers);
router.get("/:id", getUserByUserId);
router.patch("/", checkToken, updateUserByUserId);
router.patch(
  "/profile_photo",
  checkToken,
  upload.single("profile_photo"),
  updateUserImageByUserId
);
router.patch(
  "/remove_profile_photo",
  checkToken,
  removeUserImageByUserId
);
router.delete("/", checkToken, deleteUserByUserId);

module.exports = router;
