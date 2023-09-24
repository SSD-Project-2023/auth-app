const router = require("express").Router();
const cloudinary = require("../../utils/cloudinary");
const multer = require("multer");
const uuid = require("uuid").v4;
const path = require("path");
const SubmitDoc = require("../../models/SubmitDocument");

// create two arrays
const files = [];
const fileInArray = [];

//store upload file names in 32 characters
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "BACKEND/uploads");
  },
  filename: (req, file, cb) => {
    let filePath = [];
    console.log("MULTER ENTRY ", file.originalname);
    console.log("files", req.files);

    const ext = path.extname(file.originalname);
    const id = uuid();
    filePath = `${id}${ext}`; //=="id+ext"
    fileInArray.push([filePath]);
    console.log("IN ARRAY ", filePath);
    files.push(fileInArray);
    console.log("PUSHED MAIN ARRAY", fileInArray);
    cb(null, filePath);
    console.log("current length", files.length);
  },
});

const upload = multer({
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype ==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .docx format allowed!"));
    }
  },
  storage: storage,
});

router.post("/", upload.array("uploaded_Document", 10), async (req, res) => {
  try {
    console.log(req.files.length);
    console.log("Files", fileInArray);

    let docx;

    for (let i = 0; i < fileInArray.length; i++) {
      let fileext = fileInArray[i][0].split(".")[1];

      console.log(path.resolve(__dirname, "../../uploads"));

      if (fileext == "docx") {
        console.log("fileInArray[i][0] :" + fileInArray[i][0]);
        docx = await cloudinary.uploader.upload(
          `${path.resolve(__dirname, "../../uploads")}/${fileInArray[i][0]}`,
          { resource_type: "auto" }
        );
        console.log("docx : " + docx);
      }
    }

    let submitDoc = new SubmitDoc({
      email: req.body.email,
      doc: docx.secure_url,
      cloudinary_id_doc: docx.public_id,
      evaluation: "NOT EVALUATED",
    });
    console.log("doc : " + submitDoc.doc);

    await submitDoc.save();
    res.json(submitDoc);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    let submitDoc = await SubmitDoc.find();
    res.json(submitDoc);
  } catch (err) {
    console.log(err);
  }
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { evaluation } = req.body;
  await SubmitDoc.findByIdAndUpdate(id, { evaluation })
    .then(() => res.status(200).json({ success: true, message: "Evaluated" }))
    .catch((err) => res.status(500).json({ success: false, message: err }));
});

module.exports = router;
