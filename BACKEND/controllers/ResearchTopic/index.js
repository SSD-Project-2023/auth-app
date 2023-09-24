const Topic = require("../../models/ResearchTopic");
const sendEmail = require("../../utils/sendEmail");

//controller for registering topics
exports.register = async (req, res) => {
  const {
    topicName,
    userEmail,
    topicCat,
    faculty,
    date,
    lastModified = "NO MODIFICATION",
    status = "PENDING",
    acceptOrRejectBy = "NONE",
    supervisorName,
    attachment = "https://drive.google.com/file/d/120D8ZvQs9R97wiXo8JZesq13vb6ctFsK/preview",
  } = req.body;
  const members = Number(req.body.members);

  const newTopic = new Topic({
    topicName,
    userEmail,
    topicCat,
    faculty,
    members,
    date,
    lastModified,
    status,
    acceptOrRejectBy,
    supervisorName,
    attachment,
  });

  const isAvailable =
    (await Topic.findOne({
      //check the availability of saving data

      topicName: topicName,
    })) ||
    (await Topic.findOne({
      //check the availability of saving data

      userEmail: userEmail,
    }));

  if (isAvailable) {
    // if satisfied return proper error
    return res
      .status(401)
      .json({ error: "Already Planned ! Plz plan something new 😀" });
  }

  await newTopic
    .save()
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => res.status(500).json({ success: false, error: error })); // else save to the db
};

//controller for getting topics
exports.getTopics = async (req, res) => {
  await Topic.find()
    .then((getTopics) => res.json(getTopics))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

//controller for getting topic by id
exports.getTopic = async (req, res) => {
  const { id } = req.params;

  await Topic.findById(id) //find by the document by id
    .then((topic) => res.json(topic))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

exports.checkTopic = async (req, res) => {
  const { m1, m2, m3, m4 } = req.params;

  const result =
    (await Topic.findOne({ userEmail: m1 })) ||
    (await Topic.findOne({ userEmail: m2 })) ||
    (await Topic.findOne({ userEmail: m3 })) ||
    (await Topic.findOne({ userEmail: m4 }));

  return res.json(result);
};

//controller for updating topic by id
exports.updateTopic = async (req, res) => {
  //backend route for updating relavant data and passing back
  const { id } = req.params;
  const {
    topicName,
    userEmail,
    topicCat,
    faculty,
    date,
    attachment = "https://drive.google.com/file/d/120D8ZvQs9R97wiXo8JZesq13vb6ctFsK/preview",
  } = req.body;
  const members = Number(req.body.members);

  await Topic.findByIdAndUpdate(id, {
    topicName,
    userEmail,
    topicCat,
    faculty,
    date,
    members,
    attachment,
  }) //find the document by and update the relavant data
    .then(() => res.json({ success: true }))
    .catch((error) => res.json({ success: false, Error: error }));
};

//controller for deleting topic by id
exports.deleteTopic = async (req, res) => {
  const { id } = req.params;

  await Topic.findByIdAndDelete(id) //find by the document by id and delete
    .then(() => res.json({ message: "Successfully Deleted" }))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

/* IT19003160 */

exports.acceptOrReject = async (req, res) => {
  const { id } = req.params;
  const { status, lastModified, acceptOrRejectBy } = req.body;

  await Topic.findByIdAndUpdate(id, {
    status,
    lastModified,
    acceptOrRejectBy,
  }) //find the document by and update the relavant data
    .then(() => res.json({ success: true }))
    .catch((error) => res.json({ success: false, Error: error }));
};

exports.notifyStudentBySupervisor = async (req, res) => {
  const { userEmail, status, topicName, email, supervisor } = req.body;

  const message = `
        <center>
        <img src='https://i.ibb.co/4RvV7nj/logo.png' />
        <h1>Sri Lanka Institute of Information Technology</h1><br/><br/></br>
        <h3>Your research topic : ${topicName} was ${status}</h3><br/>
        <h3>${
          status === "REJECTED"
            ? `Please send a mail to ${email}`
            : "Congratulations...🥳😍❤️"
        }</h3>
        <h3>${status} by ${supervisor}</h3>

        <br/><br/></br>
        <span>Copyright © 2022 Sri Lanka Institute of Information Technology<span></center>
         `;
  try {
    await sendEmail({
      //send email
      to: userEmail,
      subject: "Research Topic Registration Status",
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
