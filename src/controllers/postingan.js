const postinganModel = require('../models/postingan')
const miscHelpers = require('../helpers/miscHelpers')
const multer = require('multer')
const path = require('path')
const cloudinary = require('cloudinary')
require('dotenv/config')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:    process.env.API_KEY_CLOUD,
    api_secret: process.env.API_SECRET_KEY_CLOUD
})

module.exports = {
    
    getAll: (req,res) => {
        postinganModel.getAll()
        .then((ress)=>{
            res.send({ status:200,message:"done",ress })
        })
    },


////// GET  post paginate ///////////////////////////////////////
    ControllerGetPost:async (req, res) => {
        let totalPage,jumlahHalaman,limit,offset,activePage,firstData
        
        await postinganModel.getAll()
        .then((result)=>{
            totalPage = result.length
        })

        offset     =    2
        activePage = parseInt(req.query.page)
        firstData  = (offset * activePage) - offset 
        jumlahHalaman =  Math.ceil(totalPage / offset)

        await  postinganModel.getAllPostingan(firstData,offset,activePage)
            .then((resultData) => {
                console.log('jml hal', jumlahHalaman)
                miscHelpers.response(res, resultData, 200)
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
            let dataImg
            await cloudinary.uploader.upload(path, result => {
                // console.log(`coba cloud`, result)
                nama_gambar = result.public_id
                dataImg = result.url
                })
            return dataImg
        }

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
    ControllerEditPost: async (req, res) => {
        let idnya = req.query.id
        let path = req.file.path
        let getUrl,data

        postinganModel.getPostinganByid(idnya)  
        .then((resultNya)=>{    //delete previous image
            let nama_gambar = resultNya[0].image_name
            cloudinary.uploader.destroy(nama_gambar, function(error,result) {
                console.log(result, error) 
            });
        })
        .catch((error) => {
            console.log(error)
        }) 

        getUrl = async req => { //upload new image
            let dataImg
            await cloudinary.uploader.upload(path, result => {
                nama_gambar = result.public_id
                dataImg = result.url
                })
            return dataImg
        }

        data = {
            id_user:req.body.id_user,
            post_name: req.body.post_name,
            image_url: await getUrl(),
            image_name: nama_gambar
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

    postinganModel.getPostinganByid(idnya)
    .then((resultData) => {
        let nama_gambar = resultData[0].image_name
        // miscHelpers.response(res, result, 200)

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