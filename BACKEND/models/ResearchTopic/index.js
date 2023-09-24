const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Topic = new Schema({
  topicName: String,
  userEmail: String,
  topicCat: String,
  faculty: String,
  members: Number,
  date: Date,
  lastModified: String,
  status: String,
  acceptOrRejectBy: String,
  supervisorName: String,
  attachment: String,
});

const newTopic = mongoose.model("research-topic", Topic);
module.exports = newTopic;
