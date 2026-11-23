const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize.config");

const Student=sequelize.define("student",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
    autoIncrement:true
    },
    full_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
  
    address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lat:{
         type: DataTypes.DECIMAL(10,8),
        allowNull:false
    },
    lng:{
         type: DataTypes.DECIMAL(11,8),
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
        allowNull:true,
    },
    school_shift:{
        type:DataTypes.ENUM("morning",'afternoon'),
        allowNull:true
    },
    guardian_fullname:{
type:DataTypes.STRING,
allowNull:false
    },
    guardian_nationalcode:{
      type:DataTypes.STRING,
      allowNull:false  
    },
    grade:{
        type:DataTypes.ENUM("Preschool","1","2","3","4","5","6","7","8","9","10","11","12"),
   allowNull:false
    },
    school_name:{
        type:DataTypes.STRING,
          allowNull:true
    },
    birthdate:{
        type:DataTypes.DATEONLY,
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
    
    status:{
        type:DataTypes.ENUM('info_completed',"contract_signed","prepaid_done",'deleted','compelete'),
        allowNull:false,
        defaultValue:"info_completed"
    },
    active:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
    last_payment_status:{
      type:DataTypes.ENUM("nopay","pending", "failed", "deleted","driver","card_to_card","gateway"),
      allowNull:false,
      defaultValue:"nopay"

    }
})


module.exports=Student;