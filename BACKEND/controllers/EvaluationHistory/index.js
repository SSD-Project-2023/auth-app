const EvaluationHistory = require("../../models/EvaluationHistory");
const sendEmail = require("../../utils/sendEmail");

exports.createHistory = async (req, res) => {
  const { status, evaluatedBy, submittedBy, docName, date, comment, rate } =
    req.body;

  const newEvaluationHistory = new EvaluationHistory({
    status,
    evaluatedBy,
    submittedBy,
    date,
    docName,
    comment,
    rate,
  });

  await newEvaluationHistory
    .save()
    .then(() => res.status(200).json({ success: true, message: "Created" }))
    .catch((err) => res.status(500).json({ success: false, message: err }));
};

exports.getHistory = async (req, res) => {
  await EvaluationHistory.find()
    .then((history) => res.status(200).json(history))
    .catch((err) => res.status(500).json({ success: false, message: err }));
};

exports.notifyStudentBySupervisor = async (req, res) => {
  const { supervisor, comment, rate, submittedBy } = req.body;

  const message = `
        <center>
        <img src='https://i.ibb.co/4RvV7nj/logo.png' />
        <h1>Sri Lanka Institute of Information Technology</h1><br/><br/></br>
        <h3>Your research document is evaulated by ${supervisor}</h3><br/>
        <h3>Comment : ${comment}</h3>
        <h3>Rating ${rate}/10</h3>

        <br/><br/></br>
        <span>Copyright © 2022 Sri Lanka Institute of Information Technology<span></center>
         `;
  try {
    await sendEmail({
      //send email
      to: submittedBy,
      subject: "Evaluation of the Research Topic",
      text: message,
    });

    return res
      .status(200)
      .json({ success: true, verify: "Email is sent to the user" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Email could not be sent" });
  }
};
