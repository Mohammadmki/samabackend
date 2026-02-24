const autoBind = require("auto-bind");
const StudentModel = require("./student.model");

class studetnService {
    #model;
    constructor(){
        autoBind(this)
        this.#model=StudentModel
    }

    async addstudent(first_name,last_name,address,lat,lng,nationalcode,deriver_id,user_id,school_id,birthdate,father_phone,mother_phone){

        return await this.#model.create({
            first_name,
            last_name,
            address,
            lat,
            lng,
            nationalcode,
            deriver_id,
            school_id,
            birthdate,
            father_phone,
            mother_phone
        })

    }

    async deletestudent(){

    }

    async updatestudent(){

    }

    async findstudent(){

    }

}

module.exports=new studetnService()