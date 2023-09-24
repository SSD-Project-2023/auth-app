const router = require("express").Router();

const {
  createStudentGroup,
  getStudentGroups,
  getStudentGroup,
  updateStudentGroup,
  deleteStudentGroup,
} = require("../../controllers/StudentGroups");

router.route("/create").post(createStudentGroup);
router.route("/getGroups").get(getStudentGroups);
router.route("/getGroup/:id").get(getStudentGroup);
router.route("/updateGroup/:id").put(updateStudentGroup);
router.route("/deleteGroup/:id").delete(deleteStudentGroup);

module.exports = router;
