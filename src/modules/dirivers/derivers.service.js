const autoBind = require("auto-bind")
const DeriverModel = require("./deriver.model")
const createHttpError = require("http-errors")

class DeriverService{

    #model

    constructor(){
        autoBind(this)

        this.#model=DeriverModel
    }

    async addDeriver({full_name,phone,plate,file_number,car_type,account_number,card_number}){
       
   const hasplate= await this.#model.findOne({where:{plate:plate},raw:true,attributes:["plate"]})

    const hasfilenumber= await this.#model.findOne({where:{file_number:file_number},raw:true,attributes:["file_number"]})

   if(hasplate){
    throw new createHttpError.Conflict("این شماره پلاک قبلا ثبت شده")
   }

   if(hasfilenumber){
    throw new createHttpError.Conflict("این شماره پرونده قبلا ثبت شده")
   }

       const resulat= await this.#model.create({full_name,phone,plate,file_number,car_type,account_number,card_number})

       return resulat


    }

      async deleteDriver(user,id){
       
        if(user.role!="admin"){
            throw new createHttpError.Unauthorized("شما دسترسی به این بخض ندارید")
        }
      
          const hasderiver= await this.#model.findOne({where:{id:id},raw:true,attributes:["id"]})

             if(!hasderiver){
    throw new createHttpError.NotFound("این راننده وجود ندارد")
   }
        return await this.#model.destroy({where:{id:id}})
    }

      async updateDriver(){
      
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

module.exports=new DeriverService()