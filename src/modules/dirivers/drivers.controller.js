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
            
            const {address,lat,lng,futher_name,full_name,phone,plate_part1,plate_letter,plate_part2,plate_city_code,file_number,car_type,account_number,card_number}=req.body

            const user=req.user

            const resualt=await this.#service.addDeriver({address,lat,lng,user,futher_name,full_name,phone,plate_part1,plate_letter,plate_part2,plate_city_code,file_number,car_type,account_number,card_number})

        res.status(200).json({
            message:"راننده با موفقیت اضافه شد"
        })

        } catch (error) {
            next(error)
        }
    }

    async activeDeriver(req,res,next){
        try {
            const id=req?.params?.id
            const user=req.user
            const {active}=req.body

            const resualt= await this.#service.activeDeriver({active,user,id})

              res.status(200).json({
            message:`راننده ${!!active?'فعال شد':'غیر فعال شد'}`
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

            const id=req?.params?.id
            
            const user=req?.user

                        const {address,lat,lng,futher_name,full_name,phone,plate_part1,plate_letter,plate_part2,plate_city_code,file_number,car_type,account_number,card_number}=req.body

                        const resualt= await this.#service.updateDriver({id,user,user,address,lat,lng,futher_name,full_name,phone,plate_part1,plate_letter,plate_part2,plate_city_code,file_number,car_type,account_number,card_number})

                               res.status(200).json({
            message:"راننده با موفقیت اضافه شد"
        })

        } catch (error) {
            next(error)
        }
    }

      async findDriver(req,res,next){
        try {
            
            const {id}=req?.params

            const user=req.user

           const resualt=await this.#service.findDriver(id,user)

           res.status(200).json({
            deriver:resualt
           })

        } catch (error) {
            next(error)
        }
    }

      async getDerivers(req,res,next){
            try {
           const user=req.user;
              const query=req.query;

              const derivers=await this.#service.getDerivers(query,user)

            res.status(200).json({
                ...derivers
            })
              

        } catch (error) {
            next(error)
        }
    }
    async getStudentsDeriver(req,res,next){
        try {
            const id=req?.params?.id
            const user=req.user

           const resualt= await this.#service.getStudentsDeriver({deriverId:id,user})
             
               res.status(200).json({
                students:resualt
            })

        } catch (error) {
            next(error)
        }
    }

 

}

module.exports= new DeriverController()