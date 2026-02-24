const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize.config");


const Peyment=sequelize.define("peyment",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
   allowNull:false
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true
    },
    status:{
        type:DataTypes.ENUM("pending","paid","failed"),
        defaultValue:"pending"
    },
    origin:{
         type:DataTypes.JSON,
            allowNull:false,
        },
        destination:{
            type:DataTypes.JSON,
            allowNull:false,
        },
        student_id:{
            type:DataTypes.INTEGER,
              allowNull:false
        }
    
})


module.exports=Peyment;