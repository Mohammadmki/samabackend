const { Router } = require("express");
const { ScoolValidator } = require("../../middleware/validator/scool.validator");
const schoolController = require("./school.controller");

const ScoolRouter=Router()

ScoolRouter.post("/add",ScoolValidator,schoolController.addscool)

ScoolRouter.put('/update/:id',ScoolValidator,schoolController.updateschool)

ScoolRouter.delete('/delete/:id',schoolController.deletescool)

ScoolRouter.get("/:id",schoolController.findScool)


module.exports=ScoolRouter