const router = require("express").Router();

const {
  register,
  login,
  forgotpassword,
  resetpassword,
  registerStaff,
  get,
  getById,
  updateById,
  deleteById,
  notifyUser,
} = require("../controllers/auth");
const { eventMiddleware } = require("../utils/eventMiddleware");

//bellow routes map the controllers
router.route("/register").post(eventMiddleware, register); // call the auth in controllers

router.route("/login").post(eventMiddleware, login);

router.route("/forgotpassword").post(eventMiddleware, forgotpassword);

router.route("/notifyuser").post(eventMiddleware, notifyUser);

router.route("/passwordreset/:resetToken").put(eventMiddleware, resetpassword);

router.route("/registerStaff").post(eventMiddleware, registerStaff);

router.route("/").get(eventMiddleware, get);

router.route("/get/:id").get(eventMiddleware, getById);

router.route("/update/:id").put(eventMiddleware, updateById);

router.route("/delete/:id").delete(eventMiddleware, deleteById);

module.exports = router;
