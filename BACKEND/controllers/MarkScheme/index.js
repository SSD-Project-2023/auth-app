const MarkScheme = require("../../models/MarkScheme");

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
      .json(JSON.stringify({ error: "Already Planned ! Plz plan something new 😀" }));
  }

  await newMarkScheme
    .save()
    .then(() => res.status(200).json(JSON.stringify({ success: true })))
    .catch((error) => res.json(JSON.stringify({ success: false, error: error }))); // else save to the db
};

//controller for getting topics
exports.getSchemes = async (req, res) => {
  await MarkScheme.find()
    .then((schemes) => res.json(JSON.stringify(schemes)))
    .catch((error) => res.status(500).json(JSON.stringify({ success: false, error: error })));
};

//controller for getting topic by id
exports.getScheme = async (req, res) => {
  const id = req.sanitize(req.params.id);
  

  await MarkScheme.findById(id) //find by the document by id
    .then((scheme) => res.json(JSON.stringify(scheme)))
    .catch((error) => res.status(500).json(JSON.stringify({ success: false, error: error })));
};
