const { body } = require("express-validator");
const { handleValidationErrors } = require("./validator.middlevare");

const StudentValidator=[
      body("first_name")
      .notEmpty().withMessage("نام الزامی است")
      .isLength({ min: 2 }).withMessage("نام باید حداقل 2 حرف باشد"),

    body("last_name")
      .notEmpty().withMessage("نام خانوادگی الزامی است")
      .isLength({ min: 2 }).withMessage("نام خانوادگی باید حداقل 2 حرف باشد"),

    body("address")
      .notEmpty().withMessage("آدرس الزامی است"),

    body("lat")
      .notEmpty().withMessage("عرض جغرافیایی الزامی است")
      .isFloat({ min: -90, max: 90 }).withMessage("عرض جغرافیایی معتبر نیست"),

    body("lng")
      .notEmpty().withMessage("طول جغرافیایی الزامی است")
      .isFloat({ min: -180, max: 180 }).withMessage("طول جغرافیایی معتبر نیست"),

    body("nationalcode")
      .notEmpty().withMessage("کد ملی الزامی است")
      .isLength({ min: 10, max: 10 }).withMessage("کد ملی باید 10 رقم باشد"),

    body("birthdate")
      .notEmpty().withMessage("تاریخ تولد الزامی است")
      .isDate().withMessage("تاریخ تولد معتبر نیست"),

    body("father_phone")
      .notEmpty().withMessage("شماره پدر الزامی است")
      .isMobilePhone("fa-IR").withMessage("شماره پدر معتبر نیست"),

    body("mother_phone")
      .notEmpty().withMessage("شماره مادر الزامی است")
      .isMobilePhone("fa-IR").withMessage("شماره مادر معتبر نیست"),

    body("school_id")
      .notEmpty().withMessage("شناسه مدرسه الزامی است")
      .isInt().withMessage("شناسه مدرسه باید عدد باشد"),


      handleValidationErrors
]

module.exports={StudentValidator}