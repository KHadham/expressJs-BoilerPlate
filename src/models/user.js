const conn = require('../configs/db')

module.exports = {
  //read all
  getUsers: (result) => { 
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM user `, (err, result) => {
            if(!err){
                resolve(result)
            }else{
                reject(new Error(err))
            }
        })
    })
},
  updateToken: (email, token) => {
    return new Promise((resolve, reject) => {
        conn.query('UPDATE user SET token = ? WHERE email = ?', [token, email], (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
  },
  
  userDetail: (userid) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT user.* ,history.* from user left join history on user.id_user = history.id_kasir where user.id_user = ?'
      , userid, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  register: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO user SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

//logout
 signout: (idlogout) => {
  return new Promise((resolve, reject) => {
    conn.query('UPDATE user SET token = "" WHERE id_user = ?', idlogout, (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
},

//login
  getByEmail: (email) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM user WHERE email = ?', email, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

}
