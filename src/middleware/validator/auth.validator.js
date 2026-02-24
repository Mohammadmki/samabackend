const { body, check } = require("express-validator");
const { handleValidationErrors } = require("./validator.middlevare");

// middleware برای بررسی خطا

// middleware ولیدیشن send OTP
const sendOtpValidator = [
    body("phone")
        .notEmpty().withMessage("شماره موبایل وارد نشده")
        .isMobilePhone("fa-IR").withMessage("لطفا یک شماره موبایل معتبر وارد کنید"),
    handleValidationErrors
]

const checkOtpValidator = [
    body("phone")
        .notEmpty().withMessage("شماره موبایل وارد نشده")
        .isMobilePhone("fa-IR").withMessage("لطفا یک شماره موبایل معتبر وارد کنید"),
    body("otp")
        .notEmpty().withMessage("کد وارد نشده")
        .isLength({ min: 5, max: 5 }).withMessage("کد باید 5 رقم باشد"),

        handleValidationErrors
    ]

module.exports = { sendOtpValidator ,checkOtpValidator}