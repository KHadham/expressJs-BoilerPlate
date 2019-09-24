const conn = require('../configs/db')

module.exports = {
  //read all
  getUsers: (result) => { 
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM auth `, (err, result) => {
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
        conn.query('UPDATE auth SET token = ? WHERE username = ?', [token, email], (err, result) => {
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
      conn.query('SELECT auth WHERE id_user = ?'
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
      conn.query('INSERT INTO auth SET ?', data, (err, result) => {
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
    conn.query('UPDATE auth SET token = "" WHERE id_user = ?', idlogout, (err, result) => {
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
      conn.query('SELECT * FROM auth WHERE username = ?', email, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
///////////// DoubleQuerryExample ///////////////////////////////////////////////////  
  DoubleQuerryExample: (data, idnya, id_buku) => {
    return new Promise((resolve, reject) => {
        konaksi.query(`UPDATE history SET ? WHERE id =?`, [data, idnya], (err, result) => {

          konaksi.query(`UPDATE library SET status_pinjam	= '0' WHERE id =?`, id_buku, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(new Error(err))
            }
          })
            
        })
    })
  }
}
