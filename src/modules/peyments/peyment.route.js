const { Router } = require("express");
const peymentController = require("./peyment.controller");
const PeumentValidator = require("../../middleware/validator/Peyment.validator");

const PeymentRouter=Router()

PeymentRouter.post("/add",PeumentValidator,peymentController.addpeyment)

PeymentRouter.put("/update/:id",PeumentValidator,peymentController.updatepeyment)

PeymentRouter.delete("/delete/:id",peymentController.deletepeyment)

PeymentRouter.get("/:id",peymentController.findpeyment)

PeymentRouter.get("/",peymentController.getallpeyment)

PeymentRouter.get("/student/:id",peymentController.getstudenpaid)

PeymentRouter.put('/change-status/:id',peymentController.changestatus)

module.exports=PeymentRouter