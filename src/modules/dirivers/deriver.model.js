const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize.config");


const Deriver=sequelize.define("deriver",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    full_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    plate:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    file_number:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
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
    account_number:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    card_number:{
        type:DataTypes.STRING,
        allowNull:false,
    }
})

module.exports=Deriver;