const { config } = require("dotenv");
const { Sequelize } = require("sequelize");

config()

const sequelize = new Sequelize({
    dialect:"mysql",
    port:process.env.DB_PROT,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD
})
sequelize.sync({alter:true})

sequelize.authenticate().then(()=>{
    console.log("connected to database")
}).catch((err)=>{
    console.log("error connecting to database =>",err.message)
})

module.exports=sequelize;