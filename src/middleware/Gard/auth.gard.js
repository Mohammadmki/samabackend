const { config } = require("dotenv")
const createHttpError = require("http-errors")
const jwt = require("jsonwebtoken")
const UserModel = require("../../modules/user/user.model")

config()

const authorization = async (req, res, next) => {
  try {
    const token=req.headers.authorization

    if (!token) {
      throw new createHttpError.Unauthorized("دسترسی محدود است لطفا ابتدا ثبت نام نمایید")
    }

    const data = jwt.verify(token, process.env.JWT_SECRET_KEY)

    if (!data?.id) {
      throw new createHttpError.Unauthorized("توکن نامعتبر است")
    }

    const user = await UserModel.findByPk(data.id, { raw: true,attributes:["role","phone","id"] })

    if (!user) {
      throw new createHttpError.NotFound("کاربر پیدا نشد لطفا دوباره ثبت نام کنید")
    }

    req.user = user  // بهتره کل اطلاعات کاربر ذخیره بشه
    return next()

  } catch (error) {
    next(error)
  }
}

module.exports = authorization