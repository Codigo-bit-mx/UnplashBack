const { response, request } = require('express');
// const {subirArchivo} = require('../helpers/subir-archivo');
const path = require('path');
const shortid = require('shortid');
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL);

const imgPOST = async(req, res = response) => {
    const extensionValidas = ['jpg', 'jpeg', 'gif', 'png'];
    try {
        const { archivo } = req.files;
        console.log(archivo);
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length -1 ];
       
            if(!extensionValidas.includes(extension)){
                console.log(`La extension ${extension} no es permitida`);
            }

        const nombreTemp = shortid.generate() + '.' + extension;
        const uploadPath = path.join( __dirname, '../public/uploads/', nombreTemp );
        archivo.mv(uploadPath);
            
        const {secure_url} = await cloudinary.uploader.upload(uploadPath); 
           
        res.json({
                archivo: nombreTemp,
                rutaLocal: secure_url 
            });
        

     }catch (error){
        res.status(500).json({
            msg: "error en el servidor "
        })
     }

}
    


module.exports = {
    imgPOST
    
} 