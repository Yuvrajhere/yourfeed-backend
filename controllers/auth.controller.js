const { selectUserByEmail } = require("../services/user.service");
const { compareSync } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

const signin = (req, res) => {
  const body = req.body;
  console.log(body);
  selectUserByEmail(body.email, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const result = compareSync(body.password, results.password);

    if (result) {
      results.password = undefined;
      const jsonwebtoken = sign({ result: results.id, role: results.is_admin }, process.env.SECRET, {
        expiresIn: "1h",
      });
      return res.json({
        success: true,
        message: "login successfully",
        token: jsonwebtoken,
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }
  });
};


const checkToken = (req, res, next) => {
  let header = req.get("authorization");
  // console.log(header);
  if (header) {
    var token = header.split(" ")[1];
    // console.log(token);
    verify(token, process.env.SECRET, (err, decoded) => {
      if(err) {
        res.json({
          success: false,
          message: err.message
        })
      } else {
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Access denied! Unauthorized user",
    });
  }
};

const isAdmin = (req, res, next) => {
  let header = req.get("authorization");
  // console.log(header);
  if (header) {
    var token = header.split(" ")[1];
    // console.log(token);
    verify(token, process.env.SECRET, (err, decoded) => {
      if(err) {
        res.json({
          success: false,
          message: err.message
        })
      } else {
        console.log("decoded",decoded);
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Access denied! Unauthorized user",
    });
  }
};

module.exports = {
  signin,
  checkToken,
  isAdmin
};
