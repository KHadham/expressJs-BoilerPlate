const conn = require('../configs/db')

module.exports = {
////////GET ALL Postingan ////////////////////////////
    getAll: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM postingan ', (err, result) => {
                if (!err) { resolve(result)} 
                else { reject( new Error(err) ) }
            })
        })
    },
   ////////GET ALL Postingan di pagination ////////////////////////////
  
    getAllPostingan: (limit,offset,orderby,sort) => {
      
        if (sort == 'desc') {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT * FROM postingan  ORDER BY  ${orderby} desc LIMIT ? ,?`, [limit,offset], (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                })
            })
        } else {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT * FROM postingan  ORDER BY ${orderby} asc LIMIT ? ,?`, [limit,offset], (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                })
            })
        }
        
    }, 
////////GET 1 Postingan ////////////////////////////

    getPostinganByid: (idnya) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM postingan where id_postingan = ?', idnya, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
//////// POST Postingan ///////////////////////////

    createPostingan: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO postingan SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

////////  EDIT Postingan ////////////////////////////

    editPostingan: (data, id) => {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE postingan SET ? WHERE id_postingan = ?', [data, id], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
//////// DELETE Postingan ////////////////////////////

    deletePostingan: (id_nya) => {
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM postingan WHERE id_Postingan = ?', id_nya, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

//////// Search Postingan ////////////////////////////
    searchPostingan: (key) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM postingan WHERE post_name LIKE "%"?"%" OR image_name LIKE "%" ? "%" ',[key,key], (err, result) => {
                if (!err) { 
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
}