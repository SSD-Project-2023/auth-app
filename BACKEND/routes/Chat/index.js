const router = require("express").Router();

const {
  postComment,
  getComment,
  updateCommentById,
  deleteCommentById,
} = require("../../controllers/Chat");

router.route("/create").post(postComment);
router.route("/getComment/:groupName").get(getComment);
router.route("/updateCommentById/:id").put(updateCommentById);
router.route("/deleteCommentById/:id").delete(deleteCommentById);

module.exports = router;
