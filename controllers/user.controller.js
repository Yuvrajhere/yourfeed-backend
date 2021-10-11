const { genSaltSync, hashSync } = require("bcrypt");
const {
  insertUser,
  selectUsers,
  selectUserById,
  updateUserById,
  updateUserImageById,
  removeUserImageById,
  deleteUserById,
} = require("../services/user.service");
const fs = require("fs");
// const tinify = require("tinify");
// tinify.key = process.env.TINIFY_KEY;

const deleteFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      throw err;
    } else {
      console.log("Successfully deleted the file.");
    }
  });
};

const addNewUser = (req, res) => {
  const body = req.body;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  insertUser(body, (err, results) => {
    if (err) {
      console.log(err);
      let errMsg;
      if (err.code == "ER_DUP_ENTRY") {
        return res.status(409).json({
          success: false,
          message: "Email or username already exists."
        })
      }
      return res.status(500).json({
        success: false,
        message: errMsg || "Database connection error",
      });
    }
    return res.status(200).json({
      success: true,
      results: results,
    });
  });
};

const getAllUsers = (req, res) => {
  selectUsers((err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    return res.json({
      success: true,
      data: results,
    });
  });
};

const getUserByUserId = (req, res) => {
  const id = req.params.id;
  selectUserById(id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Database connection error",
        errMsg: err.code,
      });
    }
    if (!results) {
      return res.json({
        success: false,
        message: "User Not found",
      });
    }
    return res.json({
      success: true,
      data: results,
    });
  });
};

const updateUserByUserId = (req, res) => {
  const body = req.body;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);

  updateUserById(body, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    return res.json({
      success: true,
      message: "updated successfully",
    });
  });
};

const updateUserImageByUserId = (req, res) => {
  const { id } = req.body;
  console.log(req.file);
  const { path } = req.file;
  // const source = tinify.fromFile(path);
  // source.toFile(`./optimized_images/${filename}`);

  const profile_photo = fs.readFileSync(path);
  updateUserImageById(id, profile_photo, (err, results) => {
    if (err) {
      console.log("err", err);
      deleteFile(path);
      // deleteFile(`./optimized_images\\${filename}`);
      return;
    }
    deleteFile(path);
    // deleteFile(`./optimized_images\\${filename}`);
    return res.json({
      success: true,
      message: "Profile photo updated successfully",
    });
  });
};

const deleteUserByUserId = (req, res) => {
  const data = req.body;
  deleteUserById(data, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    return res.json({
      success: true,
      message: "User deleted successfully",
    });
  });
};

const removeUserImageByUserId = (req, res) => {
  const id = req.body.id;
  removeUserImageById(id, (err, results) => {
    if (err) {
      console.log("err", err);
      return;
    }
    return res.json({
      success: true,
      message: "Profile photo deleted successfully",
    });
  });
}

module.exports = {
  addNewUser,
  getAllUsers,
  getUserByUserId,
  updateUserByUserId,
  updateUserImageByUserId,
  deleteUserByUserId,
  removeUserImageByUserId
};
