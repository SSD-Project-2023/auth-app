const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UploadDocument = new Schema({
  email: String,
  doc: String,
  cloudinaryID: String,
});

const newUploadDocument = mongoose.model("upload-document", UploadDocument);
module.exports = newUploadDocument;
