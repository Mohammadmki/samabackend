const autoBind = require("auto-bind");
const authService = require("./auth.service");

class AuthController {
#service;
    constructor(){
        autoBind(this)
this.#service=authService
    }

    async sentOtp(req, res,next) {
        try {
            const { phone } = req.body
            

            const otp = await this.#service.sentOtp(phone)

            return res.status(200).json({
                message: "کد با موفقیت ارسال شد", 
            })
            


        } catch (error) {
            next(error)
        }
    }

    async checkOtp(req, res,next) {
        try {
            const { phone, otp } = req.body
            const token = await this.#service.checkOtp(phone, otp)
           res.cookie("accesstoken", token, {
                httpOnly: false,
                signed: true,
                maxAge: 365*24*60*60*1000
            })
            return res.status(200).json({
                message: "شما با موفقیت وارد شدید",
            })
        }catch (error) {
            next(error)
        }
    }

    async logout(req, res,next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new AuthController()