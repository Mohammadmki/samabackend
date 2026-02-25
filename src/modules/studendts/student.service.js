const autoBind = require("auto-bind");
const StudentModel = require("./student.model");
const createHttpError = require("http-errors");
const SchoolModel = require("../schools/schools.model");

class studetnService {
    #model;
    #schoolmodel;
    constructor(){
        autoBind(this)
        this.#model=StudentModel
        this.#schoolmodel=SchoolModel
    }

    async addstudent(user,first_name,last_name,address,lat,lng,nationalcode,deriver_id,user_id,school_id,birthdate,father_phone,mother_phone){

        const school=await this.#schoolmodel.findByPk(school_id,{raw:true,attributes:["id"]})

        const  hasStudent=await this.#model.findOne({where:{
            nationalcode:nationalcode,
        },attributes:['id']})
        
        if(hasStudent){
           throw new createHttpError.Conflict("دانش آموزی با این کد ملی وجود دارد")
        }

        if(!school){
        throw new  createHttpError.NotFound("لطفا مدرسه معتبر را وارد کنید")
        }


        return await this.#model.create({
            first_name,
            last_name,
            address,
            lat,
            lng,
            nationalcode,
            deriver_id,
            school_id,
            user_id:user.id,
            birthdate,
            father_phone,
            mother_phone
        })

    }

    async deletestudent(user,studentId){

        const student= await this.#model.findByPk(studentId,{raw:true,attributes:['user_id']})

        if (user.role !== 'admin' && user.id !== student.user_id) {
    throw new createHttpError.Unauthorized("شما به این بخش دسترسی ندارید")
}

       return await this.#model.destroy({where:{
            id:studentId
        }})


    }

     async updatestudent(user,id,first_name,last_name,address,lat,lng,nationalcode,deriver_id,user_id,school_id,birthdate,father_phone,mother_phone){

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
            first_name,
            last_name,
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

        const student= await this.#model.findByPk(id,{raw:true})
        if(!student?.id){
            throw new createHttpError.NotFound("دانش آموز یافت نشد")
        }
        return student
    }

    async getstudents(){

        const students=this.#model.findAll()

        return students

    }

}

module.exports=new studetnService()