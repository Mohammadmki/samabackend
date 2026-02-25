const express = require("express");
const sequelize = require("./src/config/sequelize.config");
const { config } = require("dotenv");
const mainRouter = require("./index.router");
const cookieParser = require("cookie-parser");

config()
async function main() {

    const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET_KEY))
  app.use(mainRouter)
    app.use((req,res,next)=>{
return res.status(404).json({
    message:"not found route"
})
    })
    app.use((err,req,res,next)=>{
        console.log("error is =>",err)
        const status=err?.status??500;
        const message=err?.message??"interval server"
        return res.status(status).json({
            message,
            status
        })
    })

    console.log("✅ All tables dropped and re-created");


    app.listen(process.env.PORT,()=>{
     console.log(`srever: http://localhost:${process.env.PORT}`)
})

}



main();