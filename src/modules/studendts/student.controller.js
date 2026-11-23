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
            
            const {school_shift,full_name,guardian_fullname,guardian_nationalcode,grade,address,lat,lng,nationalcode,school_id,birthdate,father_phone,mother_phone}=req.body

            const user=req.user

            const resuat= await this.#srevice.addstudent({user,school_shift,full_name,guardian_fullname,guardian_nationalcode,grade,address,lat,lng,nationalcode,school_id,birthdate,father_phone,mother_phone})

            res.status(200).json({
                student:resuat.id,
                message:"دانش آموز با موفقیت اضافه شد"
            })
        } catch (error) {
            next(error)
        }
    }
   async completeregisterstudent(req,res,next){
    const {studentId}=req.body

    const resualt= await this.#srevice.compeletregisterstudent({studentId})
       res.status(200).json({
                prepaid:resualt.id,
                message:"دانش اموز با موفقیت ثبت شد"
            })
   } 
    async changestatus(req,res,next){   
        try {
            
            const id=req?.params?.id

            const user=req.user


            const {active}=req.body

            const restualt= await this.#srevice.changestatus(user,id,active,res)

            res.status(200).json({
                
                message:"وضعیت دانش آموز تغییر یافت"
            })

        } catch (error) {
            next(error)
        }   
    }
      async addderiver(req,res,next){     
        
        try {
            
            const {deriver_id}=req.body

            const user=req.user

            const {id}=req?.params

            const resualt=await this.#srevice.addDeriver(user,deriver_id,id)

            res.status(200).json({
                message:"دانش آموز به لیست دانش آموزان راننده افزوده شد"
            })

        } catch (error) {
            next(error)
        }
        
    }
   async deletestudent(req,res,next){

          const studentId = req?.params?.id

          const user=req?.user

        const resualt= await this.#srevice.deletestudent(user,studentId)
console.log(resualt)
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
   async getAllstudents(req,res,next){
        try {
            
            const query=req.query
       const user=req.user
            
            const resualt=await this.#srevice.getAllstudents(query,user)

            res.status(200).json({
                ...resualt
            })

        } catch (error) {
            next(error)
        }
    }
    async removederiver(req,res,next){
        try {
                       
            const user=req.user

            const {id}=req?.params
            const resualt= await this.#srevice.removederiver(user,id)

            res.status(200).json({
                message:"راننده برداشته شد"
            })

        } catch (error) {
            next(error)
        }
    }
    }

module.exports=new studentController()