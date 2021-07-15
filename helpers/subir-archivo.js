
const path = require('path');
const shortid = require('shortid');

const subirArchivo = (files, extensionValidas = ['jpg', 'png', 'gif', 'jpeg']) => {
    return new Promise ((resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length -1 ];
        
        //validar extension 
        if(!extensionValidas.includes(extension)){
            reject(`La extension ${extension} no es permitida`);
        }
        
        const nombreTemp = shortid.generate() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', nombreTemp );
      
      console.log(uploadPath);
        archivo.mv(uploadPath, (err) => {
            if(err){
               return reject(err)
            }
            resolve(nombreTemp);
        });
    })
}


module.exports = {
    subirArchivo
}