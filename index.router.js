const { Router } = require("express");
const authrouter = require("./src/modules/auth/auth.route");
const studentRouter = require("./src/modules/studendts/student.route");
const authorization = require("./src/middleware/Gard/auth.gard");
const ScoolRouter = require("./src/modules/schools/schools.router");
const DeriverRoute = require("./src/modules/dirivers/derivers.route");
const PeymentRouter = require("./src/modules/peyments/peyment.route");
const settingsRouter = require("./src/modules/settings/settings.router");

const mainRouter=Router()

mainRouter.use("/auth",authrouter)



mainRouter.use("/student",authorization,studentRouter)

mainRouter.use("/school",authorization,ScoolRouter)

mainRouter.use("/deriver",authorization,DeriverRoute)

mainRouter.use('/peyment',authorization,PeymentRouter)

mainRouter.use("/settings",authorization,settingsRouter)

module.exports=mainRouter