const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tmp");
  },
  filename: (req, file, cb) => {
const filename = `${uuidv4()}.${file.originalname.split(".").pop()}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

module.exports = upload;
