const router = require("express").Router();

const {
  postComment,
  getComment,
  updateCommentById,
  deleteCommentById,
} = require("../../controllers/Chat");
const { eventMiddleware } = require("../../utils/eventMiddleware");

router.route("/create").post(eventMiddleware, postComment);
router.route("/getComment/:groupName").get(eventMiddleware, getComment);
router.route("/updateCommentById/:id").put(eventMiddleware, updateCommentById);
router
  .route("/deleteCommentById/:id")
  .delete(eventMiddleware, deleteCommentById);

module.exports = router;
