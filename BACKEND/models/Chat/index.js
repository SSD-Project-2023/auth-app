const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Chat = new Schema({
  comment: String,
  groupName: String,
  commentedBy: String,
  date: Date,
});

const newChat = mongoose.model("chat", Chat);
module.exports = newChat;
