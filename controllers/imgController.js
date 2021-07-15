const { response, request } = require('express');
const {subirArchivo} = require('../helpers/subir-archivo');

const imgPOST = async(req, res = response) => {
   
        const archivo = await subirArchivo(req.files, undefined);
        res.json({archivo});
}


module.exports = {
    imgPOST
    
} 