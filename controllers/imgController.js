const { response, request } = require('express');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs'); 
const path = require('path');


const imgPOST = async(req, res, next) => {
 
    const configuracionMulter = {
       limit: 1204,
       storage: fileStorage = multer.diskStorage({
           destination: (req, file, cb) => {
               cb(null, __dirname+'/../public/uploads');
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
            res.json({
                        archivo: req.file.filename,
                        ruta: process.env.BACK_END_DEV_ARCHIVOS + `uploads/${req.file.filename}`
                    });
        }else {
            console.log(error);
            return next();
        }
    })
}

const imgDELETE = (req, res) => {
    console.log(req.archivo);
    try{
        fs.inlinkSync(__dirname + `/../uploads/${req.archivo}`);
        console.log('archivo eliminado');
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    imgPOST,
    imgDELETE
} 