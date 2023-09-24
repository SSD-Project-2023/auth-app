const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EvaluationHistory = new Schema({
  status: String,
  evaluatedBy: String,
  submittedBy: String,
  docName: String,
  date: Date,
  comment: String,
  rate: String,
});

const newEvaluationHistory = mongoose.model(
  "evaluation-history",
  EvaluationHistory
);
module.exports = newEvaluationHistory;
