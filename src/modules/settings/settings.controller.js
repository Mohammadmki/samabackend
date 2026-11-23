const autoBind = require("auto-bind")
const settingsService = require("./settings.service")

class settingsController{
    #service

    constructor(){
        autoBind(this)

        this.#service=settingsService

    }

    async addadmin(req,res,next){
        try {

              const user=req.user
            const {phone}=req.body

            const resualt=await this.#service.addadmin(user,phone)

            res.status(200).json({
             message:"کاربر به لیست ادمین اضافه شد"
            })
        } catch (error) {
            next(error)
        }
    }

        async deleteadmin(req,res,next){
        try {

            const user=req.user
            const {phone}=req.body

            const resualt=await this.#service.deleteadmin(user,phone)

            res.status(200).json({
             message:"کاربر از لیست ادمین پاک شد"
            })
        } catch (error) {
            next(error)
        }
    }

         async getadmins(req,res,next){
        try {
                      const user=req.user

            const resualt=await this.#service.admins(user)

            res.status(200).json({
             admins:resualt
            })
        } catch (error) {
            next(error)
        }
    }

        async uploadfile(req,res,next){
        try {
            res.status(200).json({
             message:"قرارداد افزوده شد"
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports=new settingsController()