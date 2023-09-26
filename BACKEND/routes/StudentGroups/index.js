const router = require("express").Router();

const {
  createStudentGroup,
  getStudentGroups,
  getStudentGroup,
  updateStudentGroup,
  deleteStudentGroup,
} = require("../../controllers/StudentGroups");
const { eventMiddleware } = require("../../utils/eventMiddleware");

router.route("/create").post(eventMiddleware, createStudentGroup);
router.route("/getGroups").get(eventMiddleware, getStudentGroups);
router.route("/getGroup/:id").get(eventMiddleware, getStudentGroup);
router.route("/updateGroup/:id").put(eventMiddleware, updateStudentGroup);
router.route("/deleteGroup/:id").delete(eventMiddleware, deleteStudentGroup);

module.exports = router;
