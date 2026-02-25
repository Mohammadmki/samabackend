const { Router } = require("express");
const authrouter = require("./src/modules/auth/auth.route");
const studentRouter = require("./src/modules/studendts/student.route");
const authorization = require("./src/middleware/Gard/auth.gard");
const ScoolRouter = require("./src/modules/schools/schools.router");
const DeriverRoute = require("./src/modules/dirivers/derivers.route");

const mainRouter=Router()

mainRouter.use("/auth",authrouter)

mainRouter.use(authorization)

mainRouter.use("/student",studentRouter)

mainRouter.use("/school",ScoolRouter)

mainRouter.use("/deriver",DeriverRoute)

module.exports=mainRouter