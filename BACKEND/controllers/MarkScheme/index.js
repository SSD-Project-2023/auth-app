const MarkScheme = require("../../models/MarkScheme");
const DOMPurify = require("isomorphic-dompurify");


exports.createScheme = async (req, res) => {
  const schemeName = req.sanitize(req.body.schemeName);
  const desc = req.sanitize(req.body.desc);
  const steps = req.sanitize(req.body.steps);
  const totalMarks = req.sanitize(Number(req.body.totalMarks));

  const newMarkScheme = new MarkScheme({ schemeName, desc, steps, totalMarks });

  const isAvailable = await MarkScheme.findOne({ schemeName });

  if (isAvailable) {
    // if satisfied return proper error
    return res
      .status(401)
      .json({ error: "Already Planned ! Plz plan something new 😀" });
  }

  await newMarkScheme
    .save()
    .then(() => res.status(200).json({ success: true }))
    .catch((error) =>
      res.json({ success: false, error: DOMPurify.sanitize(error) })
    ); // else save to the db
};

//controller for getting topics
exports.getSchemes = async (req, res) => {
  await MarkScheme.find()
    .then((schemes) => res.json(schemes))
    .catch((error) =>
      res.status(500).json({ success: false, error: DOMPurify.sanitize(error) })
    );
};

//controller for getting topic by id
exports.getScheme = async (req, res) => {
  const id = req.sanitize(req.params.id);
  

  await MarkScheme.findById(id) //find by the document by id
    .then((scheme) => res.json(scheme))
    .catch((error) =>
      res.status(500).json({ success: false, error: DOMPurify.sanitize(error) })
    );
};
