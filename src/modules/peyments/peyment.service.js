const autoBind = require("auto-bind");
const PeymentModel = require("./peyment.model");
const createHttpError = require("http-errors");
const StudentModel = require("../studendts/student.model");
const { Op } = require("sequelize");

class peymentService{
    #model
    #studentmodel
    constructor(){
        autoBind(this)
        this.#model=PeymentModel

        this.#studentmodel=StudentModel
    }

async checkLastpeyment(student_id) {
  const lastpayment = await this.#model.findOne({
    where: { student_id },
    order: [["createdAt", "DESC"], ["id", "DESC"]],
  });

  await this.#studentmodel.update(
    { last_payment_status: lastpayment ? lastpayment.status : "nopay" },
    { where: { id: student_id } }
  );
}

    async addpeyment({
        student_id,
                title,
                amount,
                description,
                traffic_percent
            ,user}){


                    if(user.role!=="admin"){
                        throw new createHttpError.Unauthorized("شما به این بخش دسترسی ندارید")
                    }

                    if(isNaN(student_id)){
                        throw new createHttpError.BadRequest("شناسه دانش اموز نا معتبر است")
                    }
                    const studentId=Number(student_id)

                   const hasStudent=await this.#studentmodel.findByPk(studentId,{attributes:["last_payment_status"]})

                    if(!hasStudent){
                        throw new createHttpError.NotFound("دانش اموز یافت نشد")
                    }

                    if(hasStudent.last_payment_status=="failed"||hasStudent.last_payment_status=="pending"){
                     throw new createHttpError.BadRequest("دانش آموز هنوز فیش قبلی را پردات نکرده است!");
                    }

                    

      const numericAmount = Number(amount)
const numericTraffic = Number(traffic_percent || 0)

const finalAmount = Math.ceil(numericAmount + (numericAmount * numericTraffic / 100));
                   const reualt=await this.#model.create({
                    student_id:studentId,
                title,
                amount:finalAmount,
                description,
               traffic_percent,
            })

            

           await this.checkLastpeyment(student_id)

                return reualt
       
    }

       async updatepeyment({
        user,
        id,
        title,
                student_id,
                amount,
                description,
                origin_lat,
                destination_lng,
                destination_address,
                destination_lat,
                origin_lng
                ,origin_address
                ,traffic_percent
            }){

                const haspeyment=await this.#model.findByPk(Number(id),{attributes:["student_id"]})


                if(!haspeyment){
                    throw new createHttpError.NotFound("رسید یافت نشد")
                }

                    if(user.role!=="admin"){
                        throw new createHttpError.Unauthorized("شما به این بخش دسترسی ندارید")
                    }

                    if(isNaN(student_id)||haspeyment.student_id!=student_id){
                        throw new createHttpError.BadRequest("شناسه دانش اموز نا معتبر است")
                    }
                    const studentId=Number(student_id)

                   const hasStudent=await this.#studentmodel.findByPk(studentId,{attributes:["id"]})

                    if(!hasStudent){
                        throw new createHttpError.NotFound("دانش اموز یافت نشد")
                    }

                    

      const numericAmount = Number(amount)
const numericTraffic = Number(traffic_percent || 0)

const finalAmount = numericAmount + (numericAmount * numericTraffic / 100)

                   const reualt=await this.#model.update({
                    student_id:studentId,
                title,
                amount:finalAmount,
                description,
               traffic_percent,
              destination_lng:Number(destination_lng),
               destination_lat:Number(destination_lat),
                 destination_address,
            origin_lat:Number(origin_lat),
              origin_lng:Number(origin_lng),
                origin_address 
            },{where:{id:id}})

            await this.checkLastpeyment(student_id)

                return reualt
       
    }
       async deletepeyment(id,user){

        if(user.role!="admin"){
            throw new createHttpError.Unauthorized("شما به این بخش دسترسی ندارید")
        }
        const haspeyment=await this.#model.findByPk(id,{attributes:["id","student_id","status"]})

        if(!haspeyment){
            throw new createHttpError.NotFound("رسید یافت نشد")
        }

        if(haspeyment.status!='failed'&&haspeyment.status!="pending"){
             throw new createHttpError.BadRequest("رسید پرداخت شده نمیتوان آن را حذف کرد")
        }

        const resualt=await this.#model.destroy({where:{id:id}})

        
        await this.checkLastpeyment(haspeyment.student_id)
        return
       
    }
        async findpeyment(id,user){

            const peyment=this.#model.findByPk(id,{raw:true})
            if(!peyment) {
                throw new createHttpError.NotFound("رسید یافت نشد")
            }
            return peyment


       
    }
    async getallpeyment(query,user){
        if(user.role!="admin"){
            throw new createHttpError.Unauthorized("شما به این بخش دسترسی ندارید")
        }

        const {student_id,status,title,page=1}=query

            const whereClause = {
  };
  if(student_id){
    whereClause.student_id=student_id
  }
  if(status){
    whereClause.status=status
  }
  if(title){
     whereClause.title = { [Op.like]: `%${title}%` };
  }

      const offset = (parseInt(page) - 1) * parseInt(20);
    
        const {rows,count}= await this.#model.findAndCountAll({where:whereClause,offset:offset,limit:20})

        return {total:count,
            peyments:rows,
            pagination:{
            totalItems: count,
            currentPage: parseInt(page),
            totalPages: count/20>1?count/20:1,
            }
        }
    }
    async getstudenpaid({studentid,user}){

        const student=await this.#studentmodel.findByPk(studentid)

        if(student.user_id!=user.id&&user.role!=="admin"){
            throw new createHttpError.Unauthorized("شما به این بخش دسترسی ندارید")
        }

        const payments= await this.#model.findAll({where:{student_id:studentid}})
        return payments

    }

    async changestatus(id,user,status,student_id){

        if(user.role!="admin"){
            throw new createHttpError.Unauthorized("شما به این بخش دسترسی ندارید")
        }

        const validstatus=[ "pending", "failed", "deleted","driver","card_to_card"]

        const payment=await this.#model.findByPk(id)

        if(!payment){
            throw new createHttpError.NotFound("فیش وجود ندارد")
        }

       if(!validstatus.includes(status)){
        throw new createHttpError.BadRequest('دسترسی باید از موارد زیر باشد')
       }

       await this.#model.update({status},{where:{id:id}})
      
       await this.checkLastpeyment(student_id)

       return 

    }

}

module.exports= new peymentService()