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
            const resualt = await this.#service.checkOtp(phone, otp)
        return res.status(200).json({
                message:"ورود با موفقیت انجام شد",
                user:resualt.user,
                token:resualt.token
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