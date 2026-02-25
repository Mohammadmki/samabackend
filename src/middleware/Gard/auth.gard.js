const { config } = require("dotenv")
const createHttpError = require("http-errors")
const jwt = require("jsonwebtoken")
const UserModel = require("../../modules/user/user.model")

config()

const authorization = async (req, res, next) => {
  try {
    // const token = 'Bearer s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzcyMDAxMDM2LCJleHAiOjE4MDM1NTg2MzZ9.1wcx1PKS_-oDipIWIz3ptIULWJ9YY2dm3BOdmZFltEo.DYZM5k31k9x4ap1wbjZks9baVVU9ivq7QUvTy0GKDRI'

    // if (!token) {
    //   throw new createHttpError.Unauthorized("دسترسی محدود است لطفا ابتدا ثبت نام نمایید")
    // }

    // const data = jwt.verify(token, process.env.JWT_SECRET_KEY)

    // if (!data?.id) {
    //   throw new createHttpError.Unauthorized("توکن نامعتبر است")
    // }

    // const user = await UserModel.findByPk(data.id, { raw: true,attributes:["role","phone","id"] })

    // if (!user) {
    //   throw new createHttpError.NotFound("کاربر پیدا نشد لطفا دوباره ثبت نام کنید")
    // }

    req.user = {
      role:"admin",
      phone:"09014288308",
      id:"1"
    }   // بهتره کل اطلاعات کاربر ذخیره بشه
    return next()

  } catch (error) {
    next(error)
  }
}

module.exports = authorization