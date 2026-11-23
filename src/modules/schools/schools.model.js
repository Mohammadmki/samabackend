const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize.config");

const School=sequelize.define("school",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
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
    management_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
education_level: {
  type: DataTypes.ENUM(
    'primary',          // ابتدایی
    'middle_school',    // متوسطه اول
    'high_school',      // متوسطه دوم
'Preschool' //پیش دبستانی
),
  allowNull: false
},
shift: {
  type: DataTypes.ENUM('morning', 'morning_evening','afternoon'),
  allowNull: false,
  defaultValue: 'morning'
},
from_grade:{
    type:DataTypes.ENUM("Preschool","1","2","3","4","5","6","7","8","9","10","11","12"),
    allowNull:false
},
to_grade:{
    type:DataTypes.ENUM("Preschool","1","2","3","4","5","6","7","8","9","10","11","12"),
    allowNull:false
},

},{timestamps:false})


module.exports=School;