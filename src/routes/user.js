const app = require('express')
const Routes = app.Router()
const UserController = require('../controllers/user')

Routes
    .get    ('/',           UserController.readall  )
    .get    ('/:param_id',    UserController.userbyid )
    .post   ('/',          UserController.register )
    .post   ('/login',          UserController.login )
    .patch   ('/logout/:param_user',          UserController.logout )

module.exports = Routes