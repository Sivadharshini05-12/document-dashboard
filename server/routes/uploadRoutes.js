const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files allowed"));
    }
  }
});

router.post("/", upload.array("files"), (req, res) => {
  const uploadedFiles = req.files.map((file) => ({
    filename: file.filename,
    originalName: file.originalname,
    size: file.size,
    type: file.mimetype
  }));

  res.json({
    message: "Files uploaded successfully",
    files: uploadedFiles
  });
});

module.exports = router;