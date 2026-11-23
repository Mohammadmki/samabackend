const { body } = require("express-validator");
const { handleValidationErrors } = require("./validator.middlevare");

const ScoolValidator=[
    body('name').isLength({min:4}).withMessage("نام مدرسه باید حداقل چهار کارکتر باشد")  .matches(/^[آ-ی\s]+$/)
  .withMessage("نام باید فقط شامل حروف فارسی باشد"),,

    body("address").notEmpty().withMessage("آدرس الزامی است"),

    body("lat").notEmpty().withMessage("این مورد الزامی است"),

    body("lng").notEmpty().withMessage("این مورد الزامی است"),

    body("management_name").isLength({min:3}).withMessage("نام مدیر حدقل باید چهار کارکتر باشد")  .matches(/^[آ-ی\s]+$/)
  .withMessage("نام مدیر باید فقط شامل حروف فارسی باشد"),

    body("education_level").isIn(['primary','middle_school','high_school','Preschool']).withMessage("دوره تحصیلی باید از اپشن ها باشد"),

    body("shift").isIn(['morning',"afternoon",'morning_evening']).withMessage("شیفت باید از این موارد باشد"),

      body("to_grade").isIn(["Preschool","1","2","3","4","5","6","7","8","9","10","11","12"]).withMessage("پایه تحصیلی باید از این موارد باشد"),

      body("from_grade").isIn(["Preschool","1","2","3","4","5","6","7","8","9","10","11","12"]).withMessage("پایه تحصیلی باید از این موارد باشد"),
    handleValidationErrors
]

module.exports={ScoolValidator}