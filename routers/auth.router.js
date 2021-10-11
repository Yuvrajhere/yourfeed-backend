var express = require("express");
var router = express.Router();

const { signin } = require("../controllers/auth.controller");

router.post("/signin", signin);

module.exports = router;
