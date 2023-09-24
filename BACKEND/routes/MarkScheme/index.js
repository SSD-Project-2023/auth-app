const router = require("express").Router();
const {
  createScheme,
  getSchemes,
  getScheme,
} = require("../../controllers/MarkScheme");

router.route("/create").post(createScheme);
router.route("/").get(getSchemes);
router.route("/get/:id").get(getScheme);

module.exports = router;
