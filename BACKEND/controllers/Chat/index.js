const Chat = require("../../models/Chat");
const DOMPurify = require("isomorphic-dompurify");

exports.postComment = async (req, res) => {
  const comment = req.sanitize(req.body.comment);
  const groupName = req.sanitize(req.body.groupName);
  const commentedBy = req.sanitize(req.body.commentedBy);
  const date = req.sanitize(req.body.date);
  

  const newChat = new Chat({ comment, groupName, commentedBy, date });

  await newChat
    .save()
    .then(() => res.status(200).json({ success: true, message: "Commented" }))
    .catch((err) => res.status(500).json({ success: false, message: DOMPurify.sanitize(err) }));
};

exports.getComment = async (req, res) => {
  const groupName = req.sanitize(req.params.groupName);

  await Chat.find({ groupName })
    .then((chat) => res.status(200).json(chat))
    .catch((err) =>
      res.status(500).json({ success: false, message: DOMPurify.sanitize(err) })
    );
};

exports.updateCommentById = async (req, res) => {
  const id = req.sanitize(req.params.id);
  const comment = req.sanitize(req.body.comment);
  await Chat.findByIdAndUpdate(id, { comment })
    .then(() => res.status(200).json({ success: true, message: "Updated" }))
    .catch((err) =>
      res.status(500).json({ success: false, message: DOMPurify.sanitize(err) })
    );
};

exports.deleteCommentById = async (req, res) => {
  const id = req.sanitize(req.params.id);

  await Chat.findByIdAndDelete(id)
    .then(() => res.status(200).json({ success: true, message: "Deleted" }))
    .catch((err) =>
      res.status(500).json({ success: false, message: DOMPurify.sanitize(err) })
    );
};
