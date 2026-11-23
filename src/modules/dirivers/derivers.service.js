const autoBind = require("auto-bind")
const DeriverModel = require("./deriver.model")
const createHttpError = require("http-errors")
const { raw } = require("express")
const { Op } = require("sequelize")
const Student = require("../studendts/student.model")

class DeriverService{

    #model
    #studentmodel

    constructor(){
        autoBind(this)
        this.#model=DeriverModel
        this.#studentmodel=Student
    }

    async addDeriver({user,address,lat,lng,futher_name,full_name,phone,plate_part1,plate_letter,plate_part2,plate_city_code,file_number,car_type,account_number,card_number}){
       
        const plate=plate_part1+plate_letter+plate_part2+plate_city_code

   const hasplate= await this.#model.findOne({where:{plate:plate},raw:true,attributes:["plate"]})

    const hasfilenumber= await this.#model.findOne({where:{file_number:file_number},raw:true,attributes:["file_number"]})

   if(hasplate){
    throw new createHttpError.Conflict("این شماره پلاک قبلا ثبت شده")
   }

   if(hasfilenumber){
    throw new createHttpError.Conflict("این شماره پرونده قبلا ثبت شده")
   }

       const resulat= await this.#model.create({address,lat,lng,futher_name,full_name,phone,plate_part1,plate_letter,plate_part2,plate_city_code,file_number,car_type,account_number,card_number,
        plate:plate,
        user_id:user.id
       })

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
        return await this.#model.update({deleted_At:Date.now()},{where:{id:id}})
    }

      async updateDriver({id,user,address,lat,lng,futher_name,full_name,phone,plate_part1,plate_letter,plate_part2,plate_city_code,file_number,car_type,account_number,card_number}){

        

        const hasderiver= await this.#model.findByPk(id,{attributes:['id',"user_id"]})

        
        if(!hasderiver){
          throw new createHttpError.NotFound("این راننده وجود ندارد")
        }
      if(hasderiver.user_id!=user.id&&user.role!="admin"){
throw new createHttpError.Unauthorized("شما به این بخش دسترسی ندارید")
       }
         const resulat= await this.#model.update({address,lat,lng,futher_name,full_name,phone,plate_part1,plate_letter,plate_part2,plate_city_code,file_number,car_type,account_number,card_number},{where:{
            id:id
         }})

         return resulat

    }

      async findDriver(id,user){


        const deriver= await this.#model.findByPk(id,{raw:true})

        if(!deriver){
          throw createHttpError.NotFound("راننده یافت نشد")
        }

//        if(deriver.user_id!=user.id&&user.role!="admin"){
// throw new createHttpError.Unauthorized("شما به این بخش دسترسی ندارید")
//        }

 return deriver
    }

      async getDerivers(query,user){

        if(user.role!='admin'){
            throw new createHttpError.Unauthorized("شما به این بخش دسترسی ندارید")
        }

        const {file_number,full_name,active,page=1}=query

    
          const whereClause = {
            deleted_At:null
      };
      if(active){
        whereClause.active=active
      }
        if (full_name) {
          whereClause.full_name = { [Op.like]: `%${full_name}%` };
        }
          if (file_number) {
          whereClause.file_number = { [Op.like]: `%${file_number}%` };
        }
              const offset = (parseInt(page) - 1) * parseInt(20);

        const {rows,count}=await this.#model.findAndCountAll({    where: whereClause,
    offset: offset,
    limit: 20,
    raw: true,raw:true})

        return {
          total:count,
          derivers:rows,
          totalItems: count,
          currentPage: parseInt(page),
          totalPages: count/20>1?count/20:1,
        }

       
    }
     async activeDeriver({active,user,id}){

      if(user.role!='admin'){
            throw new createHttpError.Unauthorized("شما به این بخش دسترسی ندارید")
       }

       const hasderiver=await this.#model.findByPk(id,{attributes:['id']})

        if(!hasderiver){
          throw new createHttpError.NotFound("این راننده وجود ندارد")
        }

        const resualt=await this.#model.update({active:!!active?1:0},{where:{id}})
        return resualt
      }

      async getStudentsDeriver({deriverId,user}){

        const Deriver=await this.#model.findByPk(deriverId,{attributes:["user_id"]})

        if(!Deriver){
          throw new createHttpError.NotFound("راننده یافت نشد")
        }

            if(user.role!='admin'&&Deriver.user_id!=user.id){
            throw new createHttpError.Unauthorized("شما به این بخش دسترسی ندارید")
        }

        const students= await this.#studentmodel.findAll({where:{deriver_id:deriverId}})

        return students

      }



}

module.exports=new DeriverService()