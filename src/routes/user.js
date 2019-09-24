const app = require('express')
const Routes = app.Router()
const UserController = require('../controllers/user')
const Auth = require('../helpers/auth')

Routes
    .all    ('/*',Auth.authInfo)  
    .get    ('/',           Auth.accessToken,UserController.readall  )
    .get    ('/:param_id',    Auth.accessToken,UserController.userbyid )
    .post   ('/',          UserController.register )
    .post   ('/login',          UserController.login )
    .patch  ('/logout/:param_user',          UserController.logout )

module.exports = Routes