const path = require('path');
const shortid = require('shortid');

const subirArchivo = async(req, res, files, extensionValidas = ['jpg', 'png', 'gif', 'jpeg']) => {
     
    try {
        const { archivo } = files;
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
        console.log(error);
     }

}
   


module.exports = {
    subirArchivo
}