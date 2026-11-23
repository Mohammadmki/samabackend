const { body } = require("express-validator");
const { handleValidationErrors } = require("./validator.middlevare");

const PeumentValidator=[
 body("title")
  .notEmpty().withMessage("عنوان الزامی است")
  .matches(/^[آ-ی\s]+$/)
  .withMessage("عنوان باید فقط شامل حروف فارسی باشد"),

  body("amount")
    .notEmpty().withMessage("مبلغ الزامی است")
    .isInt({ min: 0 }).withMessage("مبلغ باید عدد صحیح مثبت باشد"),

  body("description")
    .optional()
    .isString().withMessage("توضیحات باید متن باشد"),

  body("student_id")
    .notEmpty().withMessage("شناسه دانش‌آموز الزامی است")
    .isInt().withMessage("شناسه دانش‌آموز باید عدد باشد"),

  body("traffic_percent")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("درصد ترافیک باید بین ۰ تا ۱۰۰ باشد"),

    handleValidationErrors
]

module.exports=PeumentValidator