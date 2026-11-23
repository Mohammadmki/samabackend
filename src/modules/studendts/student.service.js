const autoBind = require("auto-bind");
const StudentModel = require("./student.model");
const createHttpError = require("http-errors");
const SchoolModel = require("../schools/schools.model");
const { Op } = require("sequelize");
const DeriverModel = require("../dirivers/deriver.model");
const PeymentModel = require("../peyments/peyment.model");

class studetnService {
    #model;
    #schoolmodel;
    #peymentmodel;
    #derivermodel
    constructor(){
        autoBind(this)
        this.#model=StudentModel
        this.#peymentmodel=PeymentModel
        this.#schoolmodel=SchoolModel
        this.#derivermodel=DeriverModel
    }
    
async compeletregisterstudent({studentId}){
                        const stid=Number(studentId)
                   const prepaid=await this.#peymentmodel.create({
                    student_id:stid,
                title:"پیش پرداخت",
                amount:1500000,
                description:"برای تکمیل ثبت نام خود پیش پرداخت را پرداخت کنید",
               traffic_percent:0,
            })

        const student= await this.#model.update({status:"compelete",active:true,last_payment_status:"pending"},{where:{id:stid}})

        return prepaid

}

    async addstudent({user,school_shift,full_name,guardian_fullname,guardian_nationalcode,grade,address,lat,lng,nationalcode,school_id,birthdate,father_phone,mother_phone}){

        const school=await this.#schoolmodel.findByPk(school_id,{raw:true,attributes:["id",'shift','name']})

        const  hasStudent=await this.#model.findOne({where:{
            nationalcode:nationalcode,
        },attributes:['id']})
        
        if(hasStudent){
           throw new createHttpError.Conflict("دانش آموزی با این کد ملی وجود دارد")
        }

        if(!school){
        throw new  createHttpError.NotFound("لطفا مدرسه معتبر را وارد کنید")
        }
        if(school.shift!="morning_evening"&&school.shift!=school_shift){
            throw new createHttpError.BadRequest("درحال حاضر این مدرسه با این شیفت وجود ندارد")
        }


        const student= await this.#model.create({
       user_id:user.id
       ,school_shift,
       full_name,
       guardian_fullname
       ,guardian_nationalcode
       ,grade
       ,address
       ,lat
       ,lng
       ,nationalcode
       ,school_id
       ,birthdate
       ,father_phone
       ,mother_phone,
       school_name:school.name
       ,status:"contract_signed"
        })
   
        return student


    
    }

    async deletestudent(user,studentId){

        const student= await this.#model.findByPk(studentId,{raw:true,attributes:['user_id',"last_payment_status"]})

        if (user.role !== 'admin' && user.id !== student.user_id) {
    throw new createHttpError.Unauthorized("شما به این بخش دسترسی ندارید")
}

if (!["failed", "pending"].includes(student.last_payment_status)) {
  throw new createHttpError.BadRequest("دانش آموز فیش پرداخت شده دارد، نمی‌شود حذف کرد");
}

   return await this.#model.destroy({
    where: {
        id: studentId
    }
})


    }

     async updatestudent(user,id,full_name,address,lat,lng,nationalcode,deriver_id,user_id,school_id,birthdate,father_phone,mother_phone){

        const student= await this.#model.findByPk(id,{raw:true,attributes:['id','user_id']})

             const school=await this.#schoolmodel.findByPk(school_id,{raw:true,attributes:["id"]})

        const  hasStudent=await this.#model.findOne({where:{
            nationalcode:nationalcode,
        },attributes:['id']})

        if(student.user_id!=user.id&&user.role!="admin"){
throw new createHttpError.Unauthorized("شما دسترسی به این بخش ندارید")
        }
        
        if(hasStudent&&hasStudent.id!==Number(id)){
           throw new createHttpError.Conflict("دانش آموز دیگری با این کد ملی وجود دارد")
        }

        if(!school){
        throw new  createHttpError.NotFound("لطفا مدرسه معتبر را وارد کنید")
        }

        if(!student?.id){
throw new createHttpError.NotFound("دانش آموز یافت نشد")
        }

               if (user.role !== 'admin' && user.id !== student.user_id) {
    throw new createHttpError.Unauthorized("شما به این بخش دسترسی ندارید")
}

        return await this.#model.update({
           full_name,
            address,
            lat,
            lng,
            nationalcode,
            deriver_id,
            school_id,
            user_id,
            birthdate,
            father_phone,
            mother_phone
        },{where:{id:id}})

    }

    async findstudent(id){



        const student= await this.#model.findByPk(Number(id),{raw:true})
     
        if(!student?.id){
            throw new createHttpError.NotFound("دانش آموز یافت نشد")
        }
        return student
    }

    async getstudents(){

        const students=this.#model.findAll()

        return students

    }

   async getAllstudents(query,user){

    if(user.role!='admin'){
        
        const resualt=await this.#model.findAll({where:{user_id:user.id}})
          return {
                    student:resualt
                }
    }
    const {full_name,active,status,from_grade,to_grade,deriver_id,school_id,page=1}=query

      const whereClause = {
  };
  if(deriver_id){
    whereClause.deriver_id=deriver_id
  }
  if(school_id){
    whereClause.school_id=school_id
  }
    if (full_name) {
      whereClause.full_name = { [Op.like]: `%${full_name}%` };
    }

    if(active||active==0){
        whereClause.active=active
    }
    if(status){
        whereClause.status=status
    }
 if (from_grade) {
    whereClause.grade = {
        ...whereClause.grade,
        [Op.gte]: from_grade
    }
}

if (to_grade) {
    whereClause.grade = {
        ...whereClause.grade,
        [Op.lte]: to_grade
    }
}
          const offset = (parseInt(page) - 1) * parseInt(20);


    const {rows,count}= await this.#model.findAndCountAll({
    where: whereClause,
    offset: offset,
    limit: 20,
    raw: true
    ,raw:true})
    
    return {
         total:count,
          students:rows,
          totalItems: count,
          currentPage: parseInt(page),
          totalPages: count/20>1?count/20:1,
    }


   }
   async changestatus(user,id,active,res){

    if(active!=0&&active!=1){
           return res.status(400).json({ errors:{status:"وضعیت نا معتبر"} });
    }

    if(user.role!="admin"){
        throw createHttpError.Unauthorized("شما به این بخش دسترسی ندارید")
    }
    const student=await this.#model.findByPk(id)
    if(!student){
        throw createHttpError.NotFound("دانش آموز یافت نشد")
    }
    return await this.#model.update({active},{where:{id:id}})
   }
   async addDeriver(user,deriver_id,student_id){

    if(user.role!="admin"){
        throw new createHttpError.Unauthorized("شما به این بخش دسترسی ندارید")
    }
    const deriver=await this.#derivermodel.findByPk(deriver_id,{raw:true})

    if(!deriver){
        throw new createHttpError.NotFound("راننده پیدا نشد")
    }
    if(deriver.active){
        throw new createHttpError.BadRequest('راننده فعال نیست')
    }
    return this.#model.update({deriver_id:deriver_id},{where:{id:student_id}})



   }
   async removederiver(user,student_id){
    if(user.role!='admin'){
        throw new createHttpError.Unauthorized("شما به این بخش دسترسی ندارید")
    }
     return await this.#model.update({deriver_id:null},{where:{id:student_id}})

   }

}

module.exports=new studetnService()