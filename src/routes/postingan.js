const app = require('express')
const Routes = app.Router()
const multer = require('multer')
const controlPost = require('../controllers/postingan')
// const uploadConfig = require('../helpers/multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        // cb(null, new Date().toISOString() + file.originalname);
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const upload = multer({ storage: storage })

Routes
    .get    ('/getAll',                                        controlPost.getAll)
    .get    ('/',                                  controlPost.ControllerGetPost )
    .get    ('/byID',                          controlPost.ControllerGetPostById ) // using QUERY as identifier
    .get    ('/search',                         controlPost.ControllerSearchPost ) // using QUERY as identifier
    .post   ('/',   upload.single('image'),controlPost.ControllerCreatePostingan )
    .patch  ('/edit',  upload.single('image_url'),controlPost.ControllerEditPost ) // using QUERY as identifier
    .delete ('/delete/:idUntukDelete',          controlPost.ControllerDeletePost ) // using PARAM as identifier 
    // image or image_url is based on postman
module.exports = Routes