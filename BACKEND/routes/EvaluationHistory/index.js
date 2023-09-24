const router = require("express").Router();

const {
  createHistory,
  getHistory,
  notifyStudentBySupervisor,
} = require("../../controllers/EvaluationHistory");

router.route("/create").post(createHistory);
router.route("/getHistory").get(getHistory);
router.route("/notifyStudentBySupervisor").post(notifyStudentBySupervisor);

module.exports = router;
