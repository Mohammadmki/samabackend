const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize.config");

const Student=sequelize.define("student",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
    autoIncrement:true
    },
    first_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    last_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lat:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    lng:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    nationalcode:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    deriver_id:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    school_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    birthdate:{
        type:DataTypes.DATE,
        allowNull:false
    },
    father_phone:{
        type:DataTypes.STRING,
        allowNull:false
    },
    mother_phone:{
        type:DataTypes.STRING,
        allowNull:false
    }, 
    
    register_step:{
        type:DataTypes.ENUM('info_completed',"contract_signed","prepaid_done"),
        allowNull:false,
        defaultValue:"info_completed"
    },
    active:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    }
     
})


module.exports=Student;