const StudentGroup = require("../../models/StudentGroups");
const DOMPurify = require("isomorphic-dompurify");

//controller for registering Student Groups
//Get data from the user.
//const member1_Email = req.body.member1_Email
exports.createStudentGroup = async (req, res) => {
  const group_name = req.sanitize(req.body.group_name);
  const member1_Email = req.sanitize(req.body.member1_Email);
  const member1_Name = req.sanitize(req.body.member1_Name);
  const member2_Email = req.sanitize(req.body.member2_Email);
  const member2_Name = req.sanitize(req.body.member2_Name);
  const member3_Email = req.sanitize(req.body.member3_Email);
  const member3_Name = req.sanitize(req.body.member3_Name);
  const member4_Email = req.sanitize(req.body.member4_Email);
  const member4_Name = req.sanitize(req.body.member4_Name);

  const newStudentGroup = new StudentGroup({
    group_name,
    member1_Email,
    member1_Name,
    member2_Email,
    member2_Name,
    member3_Email,
    member3_Name,
    member4_Email,
    member4_Name,
  });

  const isAvailable = await StudentGroup.findOne({
    //check the availability of saving data
    group_name,
    member1_Email,
    member2_Email,
    member3_Email,
    member4_Email,
  });

  if (isAvailable) {
    // if satisfied return proper error
    return res.status(401).json({
      error:
        "Group name is already taken or Some members are already in a group",
    });
  }

  await newStudentGroup
    .save()
    .then(() => res.status(200).json({ success: true }))
    .catch((error) =>
      res.status(500).json({ success: false, error: DOMPurify.sanitize(error) })
    ); // else save to the db
};

//controller for getting Student Groups
exports.getStudentGroups = async (req, res) => {
  await StudentGroup.find()
    .then((groups) => res.json(DOMPurify.sanitize(groups)))
    .catch((error) =>
      res.status(500).json({ success: false, error: DOMPurify.sanitize(error) })
    );
};

//controller for getting Student Group by Student Email
exports.getStudentGroup = async (req, res) => {
  const GroupName = req.params.id;

  await StudentGroup.findOne({ group_name: GroupName }) //find by the document by id
    .then((StudentGroup) => res.json(DOMPurify.sanitize(StudentGroup)))
    .catch((error) =>
      res.status(500).json({ success: false, error: DOMPurify.sanitize(error) })
    );
};

//controller for updating Student Group details by id
exports.updateStudentGroup = async (req, res) => {
  //backend route for updating relavant data and passing back
  const id = req.sanitize(req.params.id);

   const group_name = req.sanitize(req.body.group_name);
   const member1_Email = req.sanitize(req.body.member1_Email);
   const member1_Name = req.sanitize(req.body.member1_Name);
   const member2_Email = req.sanitize(req.body.member2_Email);
   const member2_Name = req.sanitize(req.body.member2_Name);
   const member3_Email = req.sanitize(req.body.member3_Email);
   const member3_Name = req.sanitize(req.body.member3_Name);
   const member4_Email = req.sanitize(req.body.member4_Email);
   const member4_Name = req.sanitize(req.body.member4_Name);

  await StudentGroup.findByIdAndUpdate(_id, {
    group_name,
    member1_Email,
    member1_Name,
    member2_Email,
    member2_Name,
    member3_Email,
    member3_Name,
    member4_Email,
    member4_Name,
  }) //find the document by and update the relavant data
    .then(() => res.json({ success: true }))
    .catch((error) =>
      res.json({ success: false, Error: DOMPurify.sanitize(error) })
    );
};

//controller for deleting Student Group by id
exports.deleteStudentGroup = async (req, res) => {
  const GroupName = req.params.id;

  await StudentGroup.findOneAndRemove({ group_name: GroupName }) //find by the document by id and delete
    .then(() => res.json({ message: "Successfully Deleted" }))
    .catch((error) =>
      res.status(500).json({ success: false, error: DOMPurify.sanitize(error) })
    );
};
