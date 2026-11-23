const autoBind = require("auto-bind")
const createHttpError = require("http-errors")
const ScoolModel = require("./schools.model")
const { Op } = require("sequelize")

class ScoolService{

    #model

    constructor(){
        autoBind(this)
        this.#model=ScoolModel
    }

    async addscool({to_grade,from_grade,user,name,shift,address,lat,lng,management_name,education_level}){

        if(user.role!="admin"){
            throw new createHttpError.Unauthorized("شما دسترسی به این بخش ندارید")
        }

        if(from_grade!="Preschool"&&to_grade!=="Preschool"&&to_grade<=from_grade){
            throw new createHttpError.BadRequest("پایه تحصیلی نا معتبر")
        }

 return await this.#model.create({to_grade,from_grade,name,shift,address,lat,lng,management_name,education_level})

    }

    async deletescool(id,user){

             if(user.role!="admin"){
            throw new createHttpError.Unauthorized("شما دسترسی به این بخش ندارید")
        }

     const school=await this.#model.findByPk(id,{raw:true,attributes:["id"]})

if(!school){
    throw new createHttpError.NotFound("مدرسه یافت نشد")
}
   await this.#model.destroy({
        where: { id }
    })

    }

    async updateschool({id,user,name,shift,address,lat,lng,management_name,education_level}){

        if (!user || user.role !== "admin") {
       console.log('ERROR USER')
            throw new createHttpError.Unauthorized("شما دسترسی به این بخش ندارید")
    }

    const school = await this.#model.findByPk(id) // raw: true حذف شد



    if (!school) {
        throw new createHttpError.NotFound("مدرسه یافت نشد")
    }

    // به این شکل instance آپدیت میشه
    school.name = name
    school.shift = shift
    school.address = address
    school.lat = lat
    school.lng = lng
    school.management_name = management_name
    school.education_level = education_level

    await school.save()  // ⚡ اینو فراموش نکن

    return school

    }

    async findScool(id){
        const school=await this.#model.findByPk(id,{raw:true})

        if(!school){
            throw new createHttpError.NotFound("مدرسه پیدا نشد")
        }

        return school
    }
async getSchools(query, user) {
 

  const { name, education_level, grade } = query;

  const whereClause = {
  };

  if (name) {
    whereClause.name = { [Op.like]: `%${name}%` };
  }

  if (education_level) {
    whereClause.education_level = education_level;
  }

  // فیلتر مدرسه‌هایی که grade در محدوده‌شان قرار دارد
  if (grade) {
    whereClause.from_grade = { [Op.lte]: grade };
    whereClause.to_grade = { [Op.gte]: grade };
  }

  const result = await this.#model.findAll({
    where: whereClause,
    raw: true
  });

  return result;
}
}

module.exports= new ScoolService()