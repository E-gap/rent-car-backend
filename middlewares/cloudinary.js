const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLAUDINARY_NAME,
  api_key: process.env.CLAUDINARY_KEY,
  api_secret: process.env.CLAUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "cars",
    allowedFormats: ["jpg", "png"],

    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
