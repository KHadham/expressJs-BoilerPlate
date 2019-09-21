// const multer = require('multer')
// const path = require('path')

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, './uploads/')
//   },
//   filename: function (req, file, cb) {
//       cb(null, new Date().toISOString() + file.originalname);
//   }
// })

// const upload = multer({ storage: storage })

// exports.multerUploads = upload

const multer = require("multer")
const DataUri = require("datauri")
const path = require("path")

const storage = multer.memoryStorage()

const multerUploads = multer({ storage }).array("image")
const dUri = new DataUri()

const dataUri = req =>
  dUri.format(path.extname(req.originalname).toString(), req.buffer)

exports.multerUploads = multerUploads
exports.dataUri = dataUri