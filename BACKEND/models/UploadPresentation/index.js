const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UploadDocument = new Schema({
  email: String,
  topic: String,
  category: String,
  feedBack: String,
  pptx: String,
  cloudinaryID: String,
});

const newUploadDocument = mongoose.model(
  "presentation-document",
  UploadDocument
);
module.exports = newUploadDocument;
