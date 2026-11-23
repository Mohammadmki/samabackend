const { Router } = require("express");
const studentController = require("./student.controller");
const { StudentValidator } = require("../../middleware/validator/student.vaidator");

const studentRouter=Router()

studentRouter.post("/add",StudentValidator,studentController.addstudent)
studentRouter.post("/prepaid",studentController.completeregisterstudent)
studentRouter.delete("/delete/:id",studentController.deletestudent)
studentRouter.put("/update/:id",StudentValidator,studentController.updatestudent)
studentRouter.get("/find/:id",studentController.findstudent)
studentRouter.get("/",studentController.getAllstudents)
studentRouter.put('/change-status/:id',studentController.changestatus)
studentRouter.put('/add-deriver/:id',studentController.addderiver)
studentRouter.put('/redmove-deriver/:id',studentController.removederiver)

module.exports=studentRouter