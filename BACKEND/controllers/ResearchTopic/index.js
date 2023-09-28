const Topic = require("../../models/ResearchTopic");
const sendEmail = require("../../utils/sendEmail");
const DOMPurify = require("isomorphic-dompurify");

//controller for registering topics
exports.register = async (req, res) => {
  const {
    lastModified = "NO MODIFICATION",
    status = "PENDING",
    acceptOrRejectBy = "NONE",
    attachment = "https://drive.google.com/file/d/120D8ZvQs9R97wiXo8JZesq13vb6ctFsK/preview",
  } = req.body;

  const topicName = req.sanitize(req.body.topicName);
  const userEmail = req.sanitize(req.body.userEmail);
  const topicCat = req.sanitize(req.body.topicCat);
  const faculty = req.sanitize(req.body.faculty);
  const date = req.sanitize(req.body.date);
  const supervisorName = req.sanitize(req.body.supervisorName);
  const members = req.sanitize(Number(req.body.members));

  

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
    .catch((error) =>
      res.status(500).json({ success: false, error: DOMPurify.sanitize(error) })
    ); // else save to the db
};

//controller for getting topics
exports.getTopics = async (req, res) => {
  await Topic.find()
    .then((getTopics) => res.json(getTopics))
    .catch((error) =>
      res.status(500).json({ success: false, error: DOMPurify.sanitize(error) })
    );
};

//controller for getting topic by id
exports.getTopic = async (req, res) => {
  const { id } = req.params;

  await Topic.findById(id) //find by the document by id
    .then((topic) => res.json(topic))
    .catch((error) =>
      res.status(500).json({ success: false, error: DOMPurify.sanitize(error) })
    );
};

exports.checkTopic = async (req, res) => {
  const m1 = req.sanitize(req.params.m1);
  const m2 = req.sanitize(req.params.m2);
  const m3 = req.sanitize(req.params.m3);
  const m4 = req.sanitize(req.params.m4);

  const result =
    (await Topic.findOne({ userEmail: m1 })) ||
    (await Topic.findOne({ userEmail: m2 })) ||
    (await Topic.findOne({ userEmail: m3 })) ||
    (await Topic.findOne({ userEmail: m4 }));

  return res.json(DOMPurify.sanitize(result));
};

//controller for updating topic by id
exports.updateTopic = async (req, res) => {
  //backend route for updating relavant data and passing back
  const id = req.sanitize(req.params.id);
  const {
    attachment = "https://drive.google.com/file/d/120D8ZvQs9R97wiXo8JZesq13vb6ctFsK/preview",
  } = req.body;

  const topicName = req.sanitize(req.body.topicName);
  const userEmail = req.sanitize(req.body.userEmail);
  const topicCat = req.sanitize(req.body.topicCat);
  const faculty = req.sanitize(req.body.faculty);
  const date = req.sanitize(req.body.date);
  const members = req.sanitize(Number(req.body.members));


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
    .catch((error) =>
      res.json({ success: false, Error: DOMPurify.sanitize(error) })
    );
};

//controller for deleting topic by id
exports.deleteTopic = async (req, res) => {
  const { id } = req.params;

  await Topic.findByIdAndDelete(id) //find by the document by id and delete
    .then(() => res.json({ message: "Successfully Deleted" }))
    .catch((error) =>
      res.status(500).json({ success: false, error: DOMPurify.sanitize(error) })
    );
};

/* IT19003160 */

exports.acceptOrReject = async (req, res) => {
  const id = req.sanitize(req.params.id);

  const status = req.sanitize(req.body.status);
  const lastModified = req.sanitize(req.body.lastModified);
  const acceptOrRejectBy = req.sanitize(req.body.acceptOrRejectBy);

  

  await Topic.findByIdAndUpdate(id, {
    status,
    lastModified,
    acceptOrRejectBy,
  }) //find the document by and update the relavant data
    .then(() => res.json({ success: true }))
    .catch((error) =>
      res.json({ success: false, Error: DOMPurify.sanitize(error) })
    );
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
