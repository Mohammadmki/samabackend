const { body } = require("express-validator");
const { handleValidationErrors } = require("./validator.middlevare");

const StudentValidator=[

      body("full_name")
      .notEmpty().withMessage("نام الزامی است")
      .matches(/^[آ-ی\s]+$/)
      .withMessage("نام باید فقط شامل حروف فارسی باشد")
      .isLength({ min: 5 }).withMessage("نام باید حداقل 5 حرف باشد"),

      
      body("guardian_fullname")
    .notEmpty().withMessage("نام ولی الزامی است")
    .matches(/^[آ-ی\s]+$/) 
    .isLength({ min: 5 }).withMessage("نام باید حداقل 5 حرف باشد"),
      
    body("address")
      .notEmpty().withMessage("آدرس الزامی است"),

    body("lat")
      .notEmpty().withMessage("عرض جغرافیایی الزامی است")
      .isFloat({ min: -90, max: 90 }).withMessage("عرض جغرافیایی معتبر نیست"),

    body("lng")
      .notEmpty().withMessage("طول جغرافیایی الزامی است")
      .isFloat({ min: -180, max: 180 }).withMessage("طول جغرافیایی معتبر نیست"),

         body("guardian_nationalcode")
      .notEmpty().withMessage("کد ملی ولی الزامی است")
      .isLength({ min: 10, max: 10 }).withMessage("کد ملی باید 10 رقم باشد"),


    body("nationalcode")
      .notEmpty().withMessage("کد ملی الزامی است")
      .isLength({ min: 10, max: 10 }).withMessage("کد ملی باید 10 رقم باشد"),

    body("birthdate")
      .notEmpty().withMessage("تاریخ تولد الزامی است"),

    body("father_phone")
      .notEmpty().withMessage("شماره پدر الزامی است")
      .isMobilePhone("fa-IR").withMessage("شماره پدر معتبر نیست"),

    body("mother_phone")
      .notEmpty().withMessage("شماره مادر الزامی است")
      .isMobilePhone("fa-IR").withMessage("شماره مادر معتبر نیست"),

    body("school_id")
      .notEmpty().withMessage("شناسه مدرسه الزامی است"),
         
    body("grade").isIn(["Preschool","1","2","3","4","5","6","7","8","9","10","11","12"]).withMessage(" پایه تحصیلی باید از این موارد باشد"),
    
    body("school_shift").isIn(['morning',"afternoon"]).withMessage("شیفت مدرسه باید از این موارد باشد"),

      handleValidationErrors
]

module.exports={StudentValidator}