const multer = require("multer");
const path = require("path");

// 1. اصلاح غلط املایی storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // اطمینان حاصل کنید که دایرکتوری public/uploads وجود دارد
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        // 2. اصلاح orginalname به originalname
        // 3. اضافه کردن شناسه منحصر به فرد برای جلوگیری از تداخل نام فایل‌ها
        const ext = path.extname(file.originalname);
        const fileName = "form" + ext;
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    if (ext === ".pdf") {
        cb(null, true); // پذیرش فایل
    } else {
        // 4. ایجاد خطای سفارشی و ارسال آن به Multer
        const err = new Error("فرمت فایل نامعتبر است. لطفاً فقط فایل‌های PDF را آپلود کنید.");
        err.status = 400; // می‌توانید کد وضعیت مورد نظر خود را تنظیم کنید
        cb(err); // ارسال خطا به Multer
    }
};

// 5. پاس دادن storage و fileFilter به Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    // می‌توانید محدودیت‌های دیگری مانند حجم فایل را هم اینجا اضافه کنید:
    // limits: { fileSize: 1024 * 1024 * 5 } // مثال: 5 مگابایت
});

// 6. export کردن middleware اصلی Multer
// نیازی به export کردن fileFilter جداگانه نیست چون در خود upload استفاده شده
module.exports = upload; // اگر CommonJS استفاده می‌کنی
// export default upload; // اگر ES Modules استفاده می‌کنی
