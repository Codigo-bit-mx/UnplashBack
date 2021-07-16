const { response, request } = require('express');
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

        //carga en modo local
        // const uploadPath = path.join( __dirname, '../public/uploads/', nombreTemp );
        // archivo.mv(uploadPath); ->>> cambia upload por tempFilePath en modo local
        // console.log(uploadPath);

        //carga en modo produccion 
        const {secure_url} = await cloudinary.uploader.upload(archivo.tempFilePath); 
           
        res.status(200).json({
                archivo: nombreTemp,
                ruta: secure_url 
            });
        

     }catch (error){
        res.status(500).json({
            msg: "Existe un error en el servidor"
        })
     }

}
    

module.exports = {
    imgPOST
    
} 