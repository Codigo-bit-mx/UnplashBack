const { response, request } = require('express');
// const {subirArchivo} = require('../helpers/subir-archivo');
const path = require('path');
const shortid = require('shortid');
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL);

const imgPOST = async(req, res = response) => {
    const extensionValidas = ['jpg', 'jpeg', 'gif', 'png'];
    try {
        const { name, tempFilePath} = req.files.archivo;
        console.log(archivo);
        const nombreCortado = name.split('.');
        const extension = nombreCortado[ nombreCortado.length -1 ];
       
            if(!extensionValidas.includes(extension)){
                console.log(`La extension ${extension} no es permitida`);
            }

        const nombreTemp = shortid.generate() + '.' + extension;
        console.log("hasta aqui llego jaja");
        const uploadPath = path.join( __dirname, '../public/uploads/', nombreTemp );
        archivo.mv(uploadPath);
        console.log(uploadPath);
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath); 
           
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