const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize.config");


const User=sequelize.define("user",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    role:{
        type:DataTypes.ENUM("admin","user"),
        defaultValue:"user"
    },
    otp_code:{
        type:DataTypes.STRING,
        allowNull:false
    },
    expired_code:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW
    },
    verified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
},{
    timestamps:true,
    modelName:"user"
})

module.exports=User;
