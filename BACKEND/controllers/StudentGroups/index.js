const StudentGroup = require("../../models/StudentGroups");

//controller for registering Student Groups
//Get data from the user.
//const member1_Email = req.body.member1_Email
exports.createStudentGroup = async (req, res) => {
  const {
    group_name,
    member1_Email,
    member1_Name,
    member2_Email,
    member2_Name,
    member3_Email,
    member3_Name,
    member4_Email,
    member4_Name,
  } = req.body;

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
    .catch((error) => res.status(500).json({ success: false, error: error })); // else save to the db
};

//controller for getting Student Groups
exports.getStudentGroups = async (req, res) => {
  await StudentGroup.find()
    .then((groups) => res.json(groups))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

//controller for getting Student Group by Student Email
exports.getStudentGroup = async (req, res) => {
  const GroupName = req.params.id;

  await StudentGroup.findOne({ group_name: GroupName }) //find by the document by id
    .then((StudentGroup) => res.json(StudentGroup))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

//controller for updating Student Group details by id
exports.updateStudentGroup = async (req, res) => {
  //backend route for updating relavant data and passing back
  const _id = req.params.id;

  const {
    group_name,
    member1_Email,
    member1_Name,
    member2_Email,
    member2_Name,
    member3_Email,
    member3_Name,
    member4_Email,
    member4_Name,
  } = req.body;

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
    .catch((error) => res.json({ success: false, Error: error }));
};

//controller for deleting Student Group by id
exports.deleteStudentGroup = async (req, res) => {
  const GroupName = req.params.id;

  await StudentGroup.findOneAndRemove({ group_name: GroupName }) //find by the document by id and delete
    .then(() => res.json({ message: "Successfully Deleted" }))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};
