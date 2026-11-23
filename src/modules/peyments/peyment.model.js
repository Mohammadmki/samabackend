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
        type:DataTypes.ENUM(  "pending", "failed", "deleted","driver","card_to_card","gateway"  ),
        defaultValue:"pending",
        allowNull:false
    },

    student_id:{
     type:DataTypes.INTEGER,
     allowNull:false
    },
        traffic_percent: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
},
authority: {
  type: DataTypes.STRING(100),
  allowNull: true,
  unique: true,
},
ref_id: {
  type: DataTypes.STRING(50),
  allowNull: true,
},
paid_at: {
  type: DataTypes.DATE,
  allowNull: true,
},
    
},{timestamps:true})


module.exports=Peyment;