const autoBind = require("auto-bind");

const studetnService=require('./student.service')

class studentController{
    #srevice;
    constructor(){
        autoBind(this)
            this.#srevice=studetnService
    }
   async addstudent(req,res,next){
        try {
            
            const {first_name,last_name,address,lat,lng,nationalcode,deriver_id,user_id,school_id,birthdate,father_phone,mother_phone}=req.body

            const user=req.user

            const resuat= await this.#srevice.addstudent(user,first_name,last_name,address,lat,lng,nationalcode,deriver_id,user_id,school_id,birthdate,father_phone,mother_phone)

            res.status(200).json({
                message:"دانش آموز با موفقیت اضافه شد"
            })
        } catch (error) {
            console.log("Error Is=>",error)
            next(error)
        }
    }
   async deletestudent(req,res,next){

          const studentId = req?.params?.id

          const user=req?.user

        const resualt=this.#srevice.deletestudent(user,studentId)

        try {
            res.status(200).json({
             message:"دانش آموز با موفقیت حذف شد"
         })
            
        } catch (error) {
            next(error)
        }
    }
   async updatestudent(req,res,next){
        const {first_name,last_name,address,lat,lng,nationalcode,deriver_id,user_id,school_id,birthdate,father_phone,mother_phone}=req.body
        const user=req?.user
              const id = req?.params?.id
           const resuat= await this.#srevice.updatestudent(user,id,first_name,last_name,address,lat,lng,nationalcode,deriver_id,user_id,school_id,birthdate,father_phone,mother_phone)

        try {
            res.status(200).json({
              message:"اطلاعات دانش آموز با موفقیت بروزرسانی شد"
          })   
        } catch (error) {
            next(error)
        }
    }
   async findstudent(req,res,next){
        try {

            const studentId = req?.params?.id

            const resualt= await this.#srevice.findstudent(studentId)

               res.status(200).json({
             student:resualt
          })
        } catch (error) {
            next(error)
        }
    }
   async getstudents(req,res,next){
        try {
            
            const resualt=this.#srevice.getstudents()

                 res.status(200).json({
             students:resualt
          })

        } catch (error) {
            next(error)
        }
    }
    }

module.exports=new studentController()