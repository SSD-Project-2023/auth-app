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

router.route("/register").post(register);
router.route("/").get(getTopics);
router.route("/get/:id").get(getTopic);
router.route("/checkTopic/:m1/:m2/:m3/:m4").get(checkTopic);
router.route("/update/:id").put(updateTopic);
router.route("/delete/:id").delete(deleteTopic);
router.route("/acceptOrReject/:id").put(acceptOrReject);
router.route("/notifyStudentBySupervisor").post(notifyStudentBySupervisor);

module.exports = router;
