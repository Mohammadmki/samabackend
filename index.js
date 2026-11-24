const express = require("express");
const { config } = require("dotenv");
config(); // قبل از require کردن کانفیگ، تا .env خونده شده باشه

const sequelize = require("./src/config/sequelize.config");
require("./RelationModels"); // ← مسیر فایل ریلیشن‌هات. حتماً قبل از sync
const mainRouter = require("./index.router");
const cookieParser = require("cookie-parser");
const cors = require("cors");

async function main() {
  const app = express();

  const corsOptions = {
    origin: "https://samafront.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.COOKIE_PARSER_SECRET_KEY));
  app.use(express.static("public"));

  app.use(mainRouter);

  app.use((req, res, next) => {
    return res.status(404).json({ message: "not found route" });
  });

  app.use((err, req, res, next) => {
    console.log("error is =>", err);
    const status = err?.status ?? 500;
    const message = err?.message ?? "internal server error";
    return res.status(status).json({ message, status });
  });

  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Database synced");
  } catch (err) {
    console.log("❌ sync error =>", err.message);
    process.exit(1);
  }

  app.listen(process.env.PORT,"0.0.0.0",() => {
    console.log(`server: http://localhost:${process.env.PORT}`);
  });
}

main();
