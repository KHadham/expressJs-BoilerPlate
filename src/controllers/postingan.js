const postinganModel = require('../models/postingan')
const miscHelpers = require('../helpers/miscHelpers')
const multer = require('multer')
const path = require('path')
const cloudinary = require('cloudinary')
require('dotenv/config')

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
    ControllerCreatePostingan: async (req, res) => {
        const path = req.file.path
        let nama_gambar 
        const getUrl = async req => {
            cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY_CLOUD,
            api_secret: process.env.API_SECRET_KEY_CLOUD
        })
    
            let dataImg
            await cloudinary.uploader.upload(path, result => {
                // console.log(`coba cloud`, result)
                nama_gambar = result.public_id
                dataImg = result.url
                })
            return dataImg
        }
        // console.log('nama file', getUrl())
        const data = {
            id_user:req.body.id_user,
            post_name: req.body.post_name,
            image_url: await getUrl(),
            image_name: nama_gambar
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
    let nama_gambar
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY_CLOUD,
        api_secret: process.env.API_SECRET_KEY_CLOUD
    })
    // nama_gambar = resultData[0].image_name
    postinganModel.getPostinganByid(idnya)
    .then((resultData) => {
        const result = resultData
        nama_gambar = resultData[0].image_name
        miscHelpers.response(res, result, 200)

        cloudinary.uploader.destroy(nama_gambar, function(error,result) {
            console.log(result, error) 
        });
        postinganModel.deletePostingan(idnya)
            .then(() => {
                miscHelpers.responDlt(res, idnya, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    })
    .catch((err) => {
        console.log(err)
    })

    cloudinary.uploader.destroy('kda39ppy52rfxx0teyz4', function(error,result) {
        console.log(result, error) });

    // postinganModel.deletePostingan(idnya)
    //     .then(() => {
    //         miscHelpers.responDlt(res, idnya, 200)
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    },
    
////// Pencarian ///////////////////////////////////////
ControllerSearchPost: (req, res) => {
    const kataKunci = req.query.keyword

    postinganModel.searchPostingan(kataKunci)
        .then((resultData) => {
            const result = resultData
            miscHelpers.response(res, result, 200)
            // res.send({
            //     status:200,
            //     message:"done",
            //     resultData
            // })
        })
        .catch((error) => {
            console.log(error)
        })
    },
}