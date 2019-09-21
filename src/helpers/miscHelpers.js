const crypto = require('crypto')

module.exports = {
    response: (res, result, status, error) => {
        let resultPrint = {}

        resultPrint.error = error || null,
            resultPrint.status_code = status || 200,
            resultPrint.result = result

        return res.status(resultPrint.status_code).json(resultPrint)
    },

    generateSalt: (length) => {
        return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length)
    },

    setPassword: (password, salt) => {
        let hash = crypto.createHmac('sha512', salt)
        hash.update(password)
        let value = hash.digest('hex')
        return {
            salt: salt,
            passwordHash: value
        }
    },
    responAdd : (res, result, status) => {
        let resp = {}
        resp.status = status
        resp.result = result
        resp.message = 'Data sudah ditambah'
        return res.status(status).json(resp)
    },
    
    responUpd: (res, result, status, idnya) => {
        let resp = {}
        let id = idnya
        resp.status = status
        resp.result = result
        
        resp.message = `data dengan id ${id} sudah di edit`
        
        return res.status(status).json(resp)
    },
    
    responDlt: (res, idnya, status) => {
        let resp = {}
        resp.status = status
        resp.idnya = idnya
        resp.message = `data dengan id ${idnya} sudah di hapus`
        return res.status(status).json(resp)
    }
}