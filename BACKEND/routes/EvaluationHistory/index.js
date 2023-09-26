const router = require("express").Router();

const {
  createHistory,
  getHistory,
  notifyStudentBySupervisor,
} = require("../../controllers/EvaluationHistory");
const { eventMiddleware } = require("../../utils/eventMiddleware");

router.route("/create").post(eventMiddleware, createHistory);
router.route("/getHistory").get(eventMiddleware, getHistory);
router
  .route("/notifyStudentBySupervisor")
  .post(eventMiddleware, notifyStudentBySupervisor);

module.exports = router;
