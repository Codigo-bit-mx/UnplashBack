const { response, request } = require('express');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs'); 


const imgPOST = async(req, res, next) => {
 
    const configuracionMulter = {
       limit: 1204,
       storage: fileStorage = multer.diskStorage({
           destination: (req, file, cb) => {
               cb(null, __dirname+'/../uploads');
           },
        filename: (req, file, cb) => {
            const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
            cb(null, `${shortid.generate()}${extension}`);
        }
       })
    }

    const upload = multer(configuracionMulter).single('archivo');
    upload(req, res, async (error) => {
        if(!error){
            res.json({archivo: req.file.filename});
        }else {
            console.log(error);
            return next();
        }
    })
}

module.exports = {
    imgPOST
}