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
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    lng:{
        type:DataTypes.DECIMAL,
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
    'high_school'       // متوسطه دوم
  ),
  allowNull: false
},
shift: {
  type: DataTypes.ENUM('morning', 'morning_evening'),
  allowNull: false,
  defaultValue: 'morning'
}

})


module.exports=School;