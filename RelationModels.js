
const Deriver = require("./src/modules/dirivers/deriver.model");
const Peyment = require("./src/modules/peyments/peyment.model");
const School = require("./src/modules/schools/schools.model");
const Student = require("./src/modules/studendts/student.model");
const User = require("./src/modules/user/user.model");

// ===== School ↔ Student =====
School.hasMany(Student, { foreignKey: "school_id", onDelete: "SET NULL" });
Student.belongsTo(School, { foreignKey: "school_id" });

// ===== Student ↔ Payment =====
Student.hasMany(Peyment, { foreignKey: "student_id", onDelete: "CASCADE" });
Peyment.belongsTo(Student, { foreignKey: "student_id" });

// ===== User ↔ Student =====
User.hasMany(Student, { foreignKey: "user_id", onDelete: "RESTRICT" });
Student.belongsTo(User, { foreignKey: "user_id", onDelete: "RESTRICT" });

// ===== Deriver ↔ Student =====
Deriver.hasMany(Student, { foreignKey: "deriver_id", onDelete: "SET NULL" });
Student.belongsTo(Deriver, { foreignKey: "deriver_id" });

// ===== Deriver ↔ User =====

User.hasMany(Deriver, { foreignKey: "user_id", onDelete: "CASCADE" });
Deriver.belongsTo(User, { foreignKey: "user_id" });

module.exports = {
  User,
  Student,
  School,
  Peyment,
  Deriver
};