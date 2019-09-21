const userModels = require('../models/user')
const MiscHelper = require('../helpers/miscHelpers')
const jwt = require('jsonwebtoken')

module.exports = {
  
///  REEEAAADDD  /////////////////////////////
  readall : (req, res) => {

    userModels.getUsers()
    .then((resultBook) => {
      MiscHelper.response(res, resultBook, 200)
        }
    )
    .catch((err) => {
        console.log(err)
    })
},
///// READ BY ID ///////////////////////////
  userbyid : (req, res) => {
  let bookid = req.params.param_id

  userModels.userDetail(bookid)
  .then((resultBook) => {
      const result = resultBook
      MiscHelper.response(res, result, 200)
  })
  .catch((err) => {
      console.log(err)
  })
},

///  REGISTER / POST /////////////////////////
  register: (req, res) => {
    const salt = MiscHelper.generateSalt(18)
    const passwordHash = MiscHelper.setPassword(req.body.password, salt)

    const data = {
      username: req.body.username,
      role:req.body.role,
      email: req.body.email,
      password: passwordHash.passwordHash,
      salt: passwordHash.salt,
      token: 'Test',
    }
    
    userModels.register(data)
      .then((resultRegister) => {
        MiscHelper.response(res, resultRegister, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

///// UPDATE /////////////////
edit_user : (req, res) => {
  const salt = MiscHelper.generateSalt(18)
    const passwordHash = MiscHelper.setPassword(req.body.password, salt)
  let idnya = req.params.param_user

  const datayangmaudiedit = {
    email: req.body.email,
    fullname: req.body.fullname,
    password: passwordHash.passwordHash,
    alamat:req.body.alamat,
    telepon:req.body.telepon,
    background:req.body.background,
  }

  userModels.U_edit(datayangmaudiedit, idnya)
  .then(() => {
      MiscHelper.response(res, datayangmaudiedit, 200,idnya)
  })
  .catch((err) => {
      console.log(err)
  })
},

/////logout//////////////////////////////
logout : (req, res) => {
  let idnya = req.params.param_user

  userModels.signout( idnya)
  .then(() => {
      MiscHelper.response(res, "logout", 200,idnya)
  })
  .catch((err) => {
      console.log(err)
  })
},

/////login//////////////////////////////
  login: (req, res) => {
    const email = req.body.email
    const password = req.body.password
console.log('email', email)
console.log('password', password)
    userModels.getByEmail(email)
      .then((result) => {
        const dataUser = result[0]
        const usePassword = MiscHelper.setPassword(password, dataUser.salt).passwordHash

        if (usePassword === dataUser.password) {
          dataUser.token = jwt.sign({
            id_user: dataUser.id_user,
            email:dataUser.email,
            username:dataUser.username
          }, "ahahah", { expiresIn: '1h' })

          delete dataUser.salt
          delete dataUser.password
          
          userModels.updateToken(email, dataUser.token)
              .then((result) => {
                  console.log(result)
              })
              .catch((error) => {
                  console.log(error)
              })
              
          return MiscHelper.response(res, dataUser, 200)
        } else {
          return MiscHelper.response(res, null, 403, 'Wrong password!')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },
  ///// DELETE //////////////////////////////

erase_user : (req, res) => {
  let bookid = req.params.param_kocok

  userModels.U_hapus(bookid)
  .then(() => {
      MiscHelper.responDlt(res, bookid, 200)
  })
  .catch((err) => {
      console.log(err)
  })
},

}
