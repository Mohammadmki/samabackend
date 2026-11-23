const { Router } = require("express");
const DeriverController=require('./drivers.controller');
const { DeriverValidator } = require("../../middleware/validator/deriver.validator");

const DeriverRoute=Router()

DeriverRoute.get("/",DeriverController.getDerivers)

DeriverRoute.get("/:id",DeriverController.findDriver)

DeriverRoute.post("/add",DeriverValidator,DeriverController.addDeriver)

DeriverRoute.delete("/delete/:id",DeriverController.deleteDriver)

DeriverRoute.put("/update/:id",DeriverValidator,DeriverController.updateDriver)

DeriverRoute.put("/:id/active",DeriverController.activeDeriver)

DeriverRoute.get("/:id/students",DeriverController.getStudentsDeriver)

DeriverRoute.get("/",DeriverController.getDerivers)

module.exports=DeriverRoute