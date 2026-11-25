const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");
const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

class AuthService {
    
    #model;

    constructor(){
        autoBind(this)
        this.#model=UserModel
    }
    async sentOtp(phone) {
 

        const user= await this.#model.findOne({where:{phone}})

        if(user){
         if(user.expired_code>Date.now()){
            throw new createHttpError.BadRequest("کد قبلی منقضی نشده است")
         }
            const otp = 11111
            //Math.floor(Math.random() * 100000)
            user.otp_code=otp;
            user.expired_code=Date.now()+(2*60*1000)
            await user.save()
         return otp
        }else{
            const otp =11111
            // Math.floor(Math.random() * 100000)
            const newUser=await this.#model.create({
                phone,
                otp_code:otp,
                expired_code:Date.now()+(2*60*1000),
                role:phone==09189637069?"admin":"user"
            })
            return otp
        }

     
    }

    async checkOtp(phone, otp) {
        const user = await this.#model.findOne({where:{phone}})
      
        if(!user){
            throw new createHttpError.NotFound("کاربر یافت نشد")
        }
       
        if(user.otp_code !== otp){
            throw new createHttpError.BadRequest("کد نامعتبر است")
        }
        if(user.expired_code<Date.now()){
            throw new createHttpError.BadRequest("کد منقضی شده است")
        }
        user.verified=true;
        const token=jwt.sign({
            id:user.id,
            phone:user.phone,
        },process.env.JWT_SECRET_KEY,{expiresIn:"1y"})
        await user.save()
        user.reload()
        return {token,user}
    }

    async logout() {
     
    }

}

module.exports=new AuthService()
