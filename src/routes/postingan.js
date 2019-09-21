const app = require('express')
const Routes = app.Router()
const multer = require('multer')
const path = require('path')
const controlPost = require('../controllers/postingan')
const auth = require('../helpers/auth')
// const uploadConfig = require('../helpers/multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const upload = multer({ storage: storage })

Routes
    .get    ('/',                                        controlPost.ControllerGetPost)
    .get    ('/ByID',                               controlPost.ControllerGetPostById ) // using QUERY as identifier
    .post   ('/',   upload.single('image'),controlPost.ControllerCreatePostingan )
    .patch  ('/edit',       upload.single('image'),controlPost.ControllerEditPost) // using QUERY as identifier
    .delete ('/delete/:idUntukDelete',                   controlPost.ControllerDeletePost) // using PARAM as identifier 

module.exports = Routes