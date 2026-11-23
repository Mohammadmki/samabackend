const { body } = require("express-validator");
const { handleValidationErrors } = require("./validator.middlevare");

const DeriverValidator=[
    body("card_number").isLength({min:16,max:16}).withMessage("لطفا یک شماره کارت معتبر وارد کنید"),
    body("account_number").isLength({min:8,max:17}).withMessage('لطفا یک شماره حساب معتبر وارد کنید'),
    body("car_type").isIn(['sedan','van']).withMessage("نوع ماشین باید از موارد زیر باشد"),
    body("plate_part1").isLength({min:2,max:2}).withMessage("لطفا یک شماره پلاک معتبر وارد نمایید"),
    body("plate_letter").isIn(["b","j","d","s","z","t","q","l","m","n","v","h","y"]).withMessage("لطفا یک شماره پلاک معتبر وارد نمایید"),
    body("plate_part2").isLength({min:3,max:3}).withMessage("لطفا یک شماره پلاک معتبر وارد نمایید"),
    body("plate_city_code").isLength({min:2,max:2}).withMessage("لطفا یک شماره پلاک معتبر وارد نمایید"),
     body("futher_name").notEmpty().withMessage("نام پدر الزامی است")
   .matches(/^[آ-ی\s]+$/)
  .withMessage("نام پدر باید فقط شامل حروف فارسی باشد"),
    body("phone").isMobilePhone("fa-IR").withMessage("لطفا یک شماره تلفن معتبر وارد کنید"),
    body("full_name").isLength({min:6}).withMessage("لطفا نام کامل خود را وارد کنید")
    .matches(/^[آ-ی\s]+$/)
  .withMessage("عنوان باید فقط شامل حروف فارسی باشد"),
   body("address")
      .notEmpty().withMessage("آدرس الزامی است"),

    body("lat")
      .notEmpty().withMessage("عرض جغرافیایی الزامی است")
      .isFloat({ min: -90, max: 90 }).withMessage("عرض جغرافیایی معتبر نیست"),

    body("lng")
      .notEmpty().withMessage("طول جغرافیایی الزامی است")
      .isFloat({ min: -180, max: 180 }).withMessage("طول جغرافیایی معتبر نیست"),

    handleValidationErrors

]

module.exports={DeriverValidator}