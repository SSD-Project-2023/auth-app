const jwt = require("jsonwebtoken");
const User = require("../models/auth");
const eventMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ error: "Unauthorized" });
    const { id } = jwt.decode(authorization);
    const isUserAvailable = await User.findById(id);
    if (Object.keys(isUserAvailable)?.length) next();
    else return res.status(401).json({ error: "Unauthorized" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { eventMiddleware };
