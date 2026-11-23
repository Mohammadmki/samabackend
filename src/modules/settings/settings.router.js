// settingsRouter.js
const { Router } = require("express");
const settingsController = require("./settings.controller");
const upload = require("../../middleware/multer");
// Import کردن middleware Multer که ساختید
 // مسیر فایل multer شما

const settingsRouter = Router();

settingsRouter.get("/admins", settingsController.getadmins);
settingsRouter.post("/add-admin", settingsController.addadmin);
settingsRouter.post("/delete-admin", settingsController.deleteadmin);

settingsRouter.post(
    "/uploadfile",
    // middleware میانی برای هندل کردن خطا از Multer
    (req, res, next) => {
        // اجرای middleware آپلود Multer
        upload.single("form")(req, res, (err) => {
            if (err) {
                // اگر Multer خطایی برگرداند (مثلاً fileFilter یا limits)
                // err.status را از جایی که خطا را ساختید (مثل fileFilter) برمی‌داریم
                // یا اگر وجود نداشت، به صورت پیش‌فرض 400 در نظر می‌گیریم
                const statusCode = err.status || 400;
                return res.status(statusCode).json({ message: err.message });
            }
            // اگر خطایی نبود، به middleware یا controller بعدی برو
            // req.file حالا حاوی اطلاعات فایل آپلود شده است
            next();
        });
    },
    // controller نهایی که فایل در req.file موجود است
    settingsController.uploadfile
);

module.exports = settingsRouter;
