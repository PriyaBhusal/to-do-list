const multer = require("multer");
const path = require("path");
const fs = require("fs");

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const imagePath = "uploads/images";
    fs.mkdirSync(imagePath, { recursive: true });
    cb(null, imagePath);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/i)) {
    return cb(new Error("Only image files are allowed (jpg, jpeg, png, gif, svg)!"));
  }
  cb(null, true);
};

const upload = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
});

module.exports = upload;
