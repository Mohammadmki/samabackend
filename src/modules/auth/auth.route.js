const { Router } = require("express");
const authController = require("./auth.controller");
const { sendOtpValidator, checkOtpValidator } = require("../../middleware/validator/auth.validator");

const authrouter=Router()

authrouter.post("/sent-otp", sendOtpValidator,authController.sentOtp)
authrouter.post("/check-otp",checkOtpValidator, authController.checkOtp)
authrouter.post("/logout", authController.logout)
module.exports=authrouter