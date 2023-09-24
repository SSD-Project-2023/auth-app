const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MarkScheme = new Schema({
  schemeName: String,
  desc: String,
  steps: String,
  totalMarks: Number,
});

const newMarkScheme = mongoose.model("mark-scheme", MarkScheme);
module.exports = newMarkScheme;
