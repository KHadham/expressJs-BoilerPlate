const cloudinary = require('cloudinary')
require('dotenv/config')

module.exports = {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY_CLOUD,
    api_secret: process.env.API_SECRET_KEY_CLOUD
  })
}