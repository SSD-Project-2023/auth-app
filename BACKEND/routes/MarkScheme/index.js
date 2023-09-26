const router = require("express").Router();
const {
  createScheme,
  getSchemes,
  getScheme,
} = require("../../controllers/MarkScheme");
const { eventMiddleware } = require("../../utils/eventMiddleware");

router.route("/create").post(eventMiddleware, createScheme);
router.route("/").get(eventMiddleware, getSchemes);
router.route("/get/:id").get(eventMiddleware, getScheme);

module.exports = router;
