const autoBind = require("auto-bind");

const studetnService=require('./student.service')

class studentController{
    #srevice;
    constructor(){
        autoBind(this)
            this.#srevice=studetnService
    }
    addstudent(req,res,next){
        try {
            
            const {first_name,last_name,address,lat,lng,nationalcode,deriver_id,user_id,school_id,birthdate,father_phone,mother_phone}=req.body

            const resuat=this.#srevice.addstudent(first_name,last_name,address,lat,lng,nationalcode,deriver_id,user_id,school_id,birthdate,father_phone,mother_phone)

            res.status(200).json({
                message:"دانش آموز با موفقیت اضافه شد"
            })
        } catch (error) {
            next(error)
        }
    }
    deletestudent(req,res,next){
        try {
            res.status(200).json({
             message:"دانش آموز با موفقیت حذف شد"
         })
            
        } catch (error) {
            next(error)
        }
    }
    updatestudent(req,res,next){
        try {
            res.status(200).json({
              message:"اطلاعات دانش آموز با موفقیت بروزرسانی شد"
          })   
        } catch (error) {
            next(error)
        }
    }
    findstudent(req,res,next){
        try {
               res.status(200).json({
              message:"اطلاعات دانش آموز با موفقیت بروزرسانی شد"
          })
        } catch (error) {
            next(error)
        }
    }
}

module.exports=new studentController()