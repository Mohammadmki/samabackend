const autoBind = require("auto-bind");
const peymentService = require("./peyment.service");

class peymentController{
    #service
    constructor(){
        autoBind(this)
        this.#service=peymentService

    }

    async addpeyment(req,res,next){
        try {
            
 
            const user=req?.user

            const {title,
                student_id,
                amount,
                description
                ,traffic_percent}=req?.body

            const resualt= await this.#service.addpeyment({
                user,title,
                student_id,
                amount,
                description
                ,traffic_percent})

                res.status(200).json({
                    message:"فیش با موفقیت افزوده شد"
                })
            
        } catch (error) {
            next(error)
        }
    }

       async updatepeyment(req,res,next){
        try {

                        const {title,
                student_id,
                amount,
                description,
                origin_lat,
                destination_lng,
                destination_address,
                destination_lat,
                origin_lng
                ,origin_address
                ,traffic_percent}=req?.body

                const {id}=req?.params
                const user=req.user

           const  resualt= await this.#service.updatepeyment({user,id,title,
                student_id,
                amount,
                description,
                origin_lat,
                destination_lng,
                destination_address,
                destination_lat,
                origin_lng
                ,origin_address
                ,traffic_percent})
            
            res.status(200).json({
                message:"رسید با موفقیت ویرایش شد"
            })

        } catch (error) {
            next(error)
        }
    }
       async deletepeyment(req,res,next){
        try {

            const {id}=req?.params

            const user=req?.user

            const resualt= await this.#service.deletepeyment(id,user)

            res.status(200).json({
                message:"رسید با موفقیت حذف شد"
            })
            
        } catch (error) {
            next(error)
        }
    }
        async findpeyment(req,res,next){
        try {
            
       const {id}=req?.params

       const user=req?.user

       const resualt= await this.#service.findpeyment(id,user)

       res.status(200).json({
        data:resualt
       })

        } catch (error) {
            next(error)
        }
    }
   async getallpeyment(req,res,next){
       try {
        const query=req.query

        const user=req.user

        const resualt=await this.#service.getallpeyment(query,user)

        res.status(200).json({
            ...resualt
        })
        
    } catch (error) {
        next(error)
    }
   }
   async getstudenpaid(req,res,next){
    try {
         const user=req.user
         const {id}=req?.params
        const resualt= await this.#service.getstudenpaid({user,studentid:id})

        return res.status(200).json({
     payments:resualt
})

    } catch (error) {
        next(error)
    }
   }
   async changestatus(req,res,next){
    try {
        
        const {id}=req.params
        const user=req.user
const {status,student_id}=req.body

console.log("STD ID=>",student_id)

const resualt=await this.#service.changestatus(id,user,status,student_id)

res.status(200).json({
    message:"وضعیت فیش تغییر کرد"
})


    } catch (error) {
        next(error)
    }
   }

}

module.exports= new peymentController()