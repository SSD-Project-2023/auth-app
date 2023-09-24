const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  //define connection
});

const connection = mongoose.connection; //assign database connection for a constant variable

connection.once("open", () => {
  //open connection for one time
  console.log("MongoDB connection was successful"); //display message in console when the connection was successful
});

const app = express();

//define a port for server
const PORT = process.env.PORT || 8070; //accually process.env.PORT is inbuilt

app.use(cors());
app.use(express.json()); //parse various different custom JSON types as JSO

app.listen(PORT, () => {
  console.log(`Server is up and running on port number ${PORT}`);
});

app.use("/api/auth", require("./BACKEND/routes/auth"));
app.use("/research-topic", require("./BACKEND/routes/ResearchTopic"));
app.use("/student-group", require("./BACKEND/routes/StudentGroups"));
app.use("/mark-scheme", require("./BACKEND/routes/MarkScheme"));
app.use("/chat", require("./BACKEND/routes/Chat"));
app.use("/document-upload", require("./BACKEND/routes/SubmitDocument"));
app.use("/evaluation-history", require("./BACKEND/routes/EvaluationHistory"));
app.use("/upload-document", require("./BACKEND/routes/UploadDocument"));
app.use("/submit-presentation", require("./BACKEND/routes/UploadPresentation"));
