const { body } = require("express-validator");
const { handleValidationErrors } = require("./validator.middlevare");

const DeriverValidator=[
    body("card_number").isLength({min:16,max:16}).withMessage("لطفا یک شماره کارت معتبر وارد کنید"),
    body("account_number").isLength({min:8,max:17}).withMessage('لطفا یک شماره حساب معتبر وارد کنید'),
    body("car_type").isIn(['sedan','van']),
    body("file_number").notEmpty().withMessage("لطفا شماره پرونده را وارد نمایید"),
body("plate").matches(/^\d{2}[بجدرسصطقلمونهی]\d{3}\d{2}$/).withMessage("لطفا یک شماره پلاک معتبر وارد نمایید"),
    body("phone").isMobilePhone("fa-IR").withMessage("لطفا یک شماره تلفن معتبر وارد کنید"),
    body("full_name").isLength({min:6}).withMessage("لطفا نام کامل خود را وارد کنید"),

    handleValidationErrors

]

module.exports={DeriverValidator}