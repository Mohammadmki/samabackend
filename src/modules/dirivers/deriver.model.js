const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize.config");


const Deriver=sequelize.define("deriver",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    deleted_At:{
        type:DataTypes.DATE,
        defaultValue:null
    },
    full_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    plate:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
     plate_part1: {
    type: DataTypes.STRING(2),
    allowNull: false,
    validate: {
      isNumeric: true,
      len: [2, 2]
    }
  },
  plate_letter: {
   type: DataTypes.ENUM(
    "b","j","d","s","z","t","q","l","m","n","v","h","y"
  ),
    allowNull: false,
  },
  plate_part2: {
    type: DataTypes.STRING(3),
    allowNull: false,
    validate: {
      isNumeric: true,
      len: [3, 3]
    }
  },
  plate_city_code: {
    type: DataTypes.STRING(2),
    allowNull: false,
    validate: {
      isNumeric: true,
      len: [2, 2]
    }
  },
    phone:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    
    file_number:{
        type:DataTypes.STRING,
        defaultValue:null,
        unique:true,
    },
    active:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
    car_type:{
        type:DataTypes.ENUM("sedan","van"),
        allowNull:false
    },
    user_id:{
         type:DataTypes.INTEGER,
        allowNull:false,
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
    account_number:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    card_number:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    futher_name:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports=Deriver;