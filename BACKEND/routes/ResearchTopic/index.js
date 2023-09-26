const router = require("express").Router();

const {
  register,
  getTopics,
  getTopic,
  checkTopic,
  updateTopic,
  deleteTopic,
  acceptOrReject,
  notifyStudentBySupervisor,
} = require("../../controllers/ResearchTopic");
const { eventMiddleware } = require("../../utils/eventMiddleware");

router.route("/register").post(eventMiddleware, register);
router.route("/").get(eventMiddleware, getTopics);
router.route("/get/:id").get(eventMiddleware, getTopic);
router.route("/checkTopic/:m1/:m2/:m3/:m4").get(eventMiddleware, checkTopic);
router.route("/update/:id").put(eventMiddleware, updateTopic);
router.route("/delete/:id").delete(eventMiddleware, deleteTopic);
router.route("/acceptOrReject/:id").put(eventMiddleware, acceptOrReject);
router
  .route("/notifyStudentBySupervisor")
  .post(eventMiddleware, notifyStudentBySupervisor);

module.exports = router;
