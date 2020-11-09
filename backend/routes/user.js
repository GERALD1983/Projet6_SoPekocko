// variables
const express = require("express");
const { verify } = require("jsonwebtoken");
const router = express.Router();

const userCtrl = require("../controllers/user");
const verifyPassword = require("../middleware/pass");
const verifyEmail = require("../middleware/email");

// routes pour l inscription et le login

router.post("/signup", verifyEmail, verifyPassword, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
