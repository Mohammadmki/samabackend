const autoBind = require("auto-bind");
const schoolService = require("./school.service");

class ScoolController{

    #service

    constructor(){
        autoBind(this)

        this.#service=schoolService
    }

    async addscool(req,res,next){
        try {
            const user=req?.user

            console.log('USR IS=>',user)

            const {name,address,lat,lng,management_name,education_level,shift}=req.body

            const resualt= await this.#service.addscool({user,name,address,shift,lat,lng,management_name,education_level})

            res.status(200).json({
                messsage:"مدرسه با موفقیت افزوده شد"
            })

        } catch (error) {
            next(error)
            
        }
    }

        async deletescool(req,res,next){
        try {
           
            const scoolId=req?.params?.id

            const user=req.user

            const resualt= await this.#service.deletescool(scoolId,user)

            res.status(200).json({
                messsage:"مدرسه با موفقیت حذف شد"
            })

        } catch (error) {
            next(error)
            
        }
    }

       async updateschool(req,res,next){
        try {
            
            const user=req.user
             
            const id=req?.params?.id

             const {name,address,lat,lng,management_name,education_level,shift}=req.body

             const resualt= await this.#service.updateschool({user,id,shift,name,address,lat,lng,management_name,education_level})


            res.status(200).json({
                messsage:"مدرسه با موفقیت ویرایش شد"
            })

        } catch (error) {
            next(error)
            
        }
    }
    
        async findScool(req,res,next){
        try {
            
                      const id=req?.params?.id

            const resualt= await this.#service.findScool(id)

            res.status(200).json({
                data:resualt
            })

        } catch (error) {
            next(error)
            
        }
    }
}

module.exports=new ScoolController()