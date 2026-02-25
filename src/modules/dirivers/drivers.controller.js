const autoBind = require("auto-bind");
const deriversService = require("./derivers.service");

class DeriverController{

    #service

    constructor(){
        autoBind(this)
        this.#service=deriversService
    }

    async addDeriver(req,res,next){
        try {
            
            const {full_name,phone,plate,file_number,car_type,account_number,card_number}=req.body

            console.log(req.body)

            const resualt=await this.#service.addDeriver({full_name,phone,plate,file_number,car_type,account_number,card_number})

        res.status(200).json({
            message:"راننده با موفقیت اضافه شد"
        })

        } catch (error) {
            next(error)
        }
    }

      async deleteDriver(req,res,next){
        try {

            const user=req.user

            const {id}=req?.params

            console.log("id is=>",id)

            const resualt=await this.#service.deleteDriver(user,id)
            
        res.status(200).json({
            message:"راننده با موفقیت حذف شد"
        })


        } catch (error) {
            next(error)
        }
    }

      async updateDriver(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }
    }

      async findDriver(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }
    }

      async getDerivers(req,res,next){
        try {
        } catch (error) {
            next(error)
        }
    }

}

module.exports= new DeriverController()