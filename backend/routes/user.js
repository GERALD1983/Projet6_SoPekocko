const express = require("express");
const { verify } = require("jsonwebtoken");
const router = express.Router();

const userCtrl = require("../controllers/user");
const verifyPassword = require("../middleware/pass");

router.post("/signup", verifyPassword, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
