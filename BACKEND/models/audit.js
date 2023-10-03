const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Audit = new Schema({
  email: String,
  createdAt: Date,
  status: String
});

const newAudit = mongoose.model("audit", Audit);
module.exports = newAudit;
