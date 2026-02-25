const { body } = require("express-validator");
const { handleValidationErrors } = require("./validator.middlevare");

const ScoolValidator=[
    body('name').isLength({min:4}).withMessage("نام مدرسه باید حداقل چهار کارکتر باشد"),

    body("address").notEmpty().withMessage("آدرس الزامی است"),

    body("lat").notEmpty().withMessage("این مورد الزامی است"),

    body("lng").notEmpty().withMessage("این مورد الزامی است"),

    body("management_name").isLength({min:3}).withMessage("نام مدیر حدقل باید چهار کارکتر باشد"),

    body("education_level").isIn(['primary','middle_school','high_school']).withMessage("دوره تحصیلی باید از اپشن ها باشد"),

    body("shift").isIn(['morning', 'morning_evening']).withMessage("شیفت باید از اپشن ها باشد"),

    handleValidationErrors
]

module.exports={ScoolValidator}