const { Router } = require("express");
const authrouter = require("./src/modules/auth/auth.route");
const studentRouter = require("./src/modules/studendts/student.route");

const mainRouter=Router()

mainRouter.use("/auth",authrouter)
mainRouter.use("/student",studentRouter)

module.exports=mainRouter