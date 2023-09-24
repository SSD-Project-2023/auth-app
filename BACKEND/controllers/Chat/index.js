const Chat = require("../../models/Chat");

exports.postComment = async (req, res) => {
  const { comment, groupName, commentedBy, date } = req.body;

  const newChat = new Chat({ comment, groupName, commentedBy, date });

  await newChat
    .save()
    .then(() => res.status(200).json({ success: true, message: "Commented" }))
    .catch((err) => res.status(500).json({ success: false, message: err }));
};

exports.getComment = async (req, res) => {
  const { groupName } = req.params;

  await Chat.find({ groupName })
    .then((chat) => res.status(200).json(chat))
    .catch((err) => res.status(500).json({ success: false, message: err }));
};

exports.updateCommentById = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  await Chat.findByIdAndUpdate(id, { comment })
    .then(() => res.status(200).json({ success: true, message: "Updated" }))
    .catch((err) => res.status(500).json({ success: false, message: err }));
};

exports.deleteCommentById = async (req, res) => {
  const { id } = req.params;

  await Chat.findByIdAndDelete(id)
    .then(() => res.status(200).json({ success: true, message: "Deleted" }))
    .catch((err) => res.status(500).json({ success: false, message: err }));
};
