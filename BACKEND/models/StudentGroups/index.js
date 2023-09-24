const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentGroup = new Schema({
  group_name: String,
  member1_Email: String,
  member1_Name: String,
  member2_Email: String,
  member2_Name: String,
  member3_Email: String,
  member3_Name: String,
  member4_Email: String,
  member4_Name: String,
});

const newStudentGroup = mongoose.model("student-group", StudentGroup);
module.exports = newStudentGroup;
