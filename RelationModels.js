
const Deriver = require("./src/modules/dirivers/deriver.model");
const Peyment = require("./src/modules/peyments/peyment.model");
const School = require("./src/modules/schools/schools.model");
const Student = require("./src/modules/studendts/student.model");
const User = require("./src/modules/user/user.model");

// ===== School ↔ Student =====
School.hasMany(Student, { foreignKey: "school_id", onDelete: "CASCADE" });
Student.belongsTo(School, { foreignKey: "school_id" });

// ===== Student ↔ Payment =====
Student.hasMany(Peyment, { foreignKey: "student_id", onDelete: "CASCADE" });
Peyment.belongsTo(Student, { foreignKey: "student_id" });

// ===== User ↔ Student =====
User.hasMany(Student, { foreignKey: "user_id", onDelete: "CASCADE" });
Student.belongsTo(User, { foreignKey: "user_id" });

// ===== Deriver ↔ Student =====
Deriver.hasMany(Student, { foreignKey: "deriver_id", onDelete: "SET NULL" });
Student.belongsTo(Deriver, { foreignKey: "deriver_id" });

// ===== Deriver ↔ School (Many-to-Many) =====
Deriver.belongsToMany(School, { through: "deriver_schools" });
School.belongsToMany(Deriver, { through: "deriver_schools" });

module.exports = {
  User,
  Student,
  School,
  Peyment,
  Deriver
};