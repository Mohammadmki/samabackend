const { Router } = require("express");
const studentController = require("./student.controller");
const { StudentValidator } = require("../../middleware/validator/student.vaidator");

const studentRouter=Router()

studentRouter.post("/add",StudentValidator,studentController.addstudent)
studentRouter.delete("/delete/:id",studentController.deletestudent)
studentRouter.put("/update/:id",StudentValidator,studentController.updatestudent)
studentRouter.get("/find/:id",studentController.findstudent)

module.exports=studentRouter