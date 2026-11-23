const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");
const createHttpError = require("http-errors");

class settingsService{

    #usermodel

    constructor(){
        autoBind(this)

        this.#usermodel=UserModel
    }

  async addadmin(useradmin,phone){

    if(useradmin.role!="admin"){
        throw new createHttpError.Unauthorized("شما به این بخش دسترسی ندارید")
    }

     const user= await this.#usermodel.findOne({where:{phone:phone}})

     if(!user){
        throw new createHttpError.NotFound("کاربر یافت نشد")
     }

      user.role="admin"

      await user.save()

      return user

    }

    async admins(user){
            if(user.role!="admin"){
        throw new createHttpError.Unauthorized("شما به این بخش دسترسی ندارید")
    }
     const admins= await this.#usermodel.findAll({where:{role:"admin"}})

     return admins

    }

        async deleteadmin(useradmin,phone){
        if(useradmin.role!="admin"){
        throw new createHttpError.Unauthorized("شما به این بخش دسترسی ندارید")
    }

     const user= await this.#usermodel.findOne({where:{phone:phone}})

     if(!user){
        throw new createHttpError.NotFound("کاربر یافت نشد")
     }

      user.role="user"

      await user.save()

      return user
    }

        async uploadfile(req,res,next){
      
    }

}

module.exports=new settingsService()