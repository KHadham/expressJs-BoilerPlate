const postinganModel = require('../models/postingan')
const miscHelpers = require('../helpers/miscHelpers')
const jwt = require('jsonwebtoken')

module.exports = {
////// GET ALL post ///////////////////////////////////////
    ControllerGetPost: (req, res) => {
        postinganModel.getAllPostingan()
            .then((resultData) => {
                // miscHelpers.response(res, resultData)
                res.send({
                    status:200,
                    message:"done",
                    resultData
                })
            })
            .catch((error) => {
                console.log(error)
            })
        },

/////// GET 1 post /////////////////////////////////////////////
    ControllerGetPostById: (req, res) => {
        const id = req.query.id

        postinganModel.getPostinganByid(id)
        .then((resultData) => {
            const result = resultData
            miscHelpers.response(res, result, 200)
        })
        .catch((err) => {
            console.log(err)
        })
    },

///////  POST post /////////////////////////////////////////////
    ControllerCreatePostingan: (req, res) => {

        const data = {
            id_user:req.body.id_user,
            post_name: req.body.post_name,
            image: req.file.path,
        }

        postinganModel.createPostingan(data)
        .then(()=> {
            miscHelpers.responAdd(res, data, 200)
        })
        .catch((err) => {
            console.log(err)
        })
    },

/////// EDIT / PATCH post /////////////////////////////////////////////
    ControllerEditPost: (req, res) => {
        let idnya = req.query.id

        const data = {
            id_user:req.body.id_user,
            post_name: req.body.post_name,
            image: req.file.path,
        }

    postinganModel.editPostingan(data,idnya)
            .then(() => {
                miscHelpers.responUpd(res, data, 200, idnya)
        })
        .catch((error) => {
            console.log(error)
        })
    },
//////// DELETE post ////////////////////////////////////////

ControllerDeletePost: (req, res) => {
    let idnya = req.params.idUntukDelete

    postinganModel.deletePostingan(idnya)
        .then(() => {
            miscHelpers.responDlt(res, idnya, 200)
        })
        .catch((error) => {
            console.log(error)
        })
    },
}