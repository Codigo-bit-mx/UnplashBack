const Caracteristica = require('../models/modCaracteristicas');
const { validationResult } = require('express-validator');

const nuevaImgCar = async (req, res, next) => {
   
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    //nombre del archivo con shortid
    const {titulo, nombre_original, nombre, descripcion, categoria, ruta } = req.body;
    const caracteristica = new Caracteristica();
    caracteristica.titulo = titulo;
    caracteristica.nombre = nombre;
    caracteristica.nombre_original = nombre_original;
    caracteristica.categoria = categoria;
    caracteristica.ruta = ruta;
    caracteristica.descripcion = descripcion;
   
    try{
        await caracteristica.save();
        return res.status(200).json({msg: `${caracteristica.ruta}`});
    }catch(error){
        console.log(error);
        res.status(400).send({msg: 'Esta fallando el endpoint para agregar las caracteristicas de una nueva img'});

    }
}

const imgAll = async (req, res) => {
  try {
        const datos = await Caracteristica.find({estado: true}).select('_nombre titulo descripcion ruta id estado');
        res.status(200).json({datos});
    }catch(error){
        console.log(error)
        res.status(400).send({msg: 'Esta fallando el endpoint para obtener todas las imgs'});
    }
}

const imgCategoria = async (req, res) => {
    const { categoria } = req.params;
    try{
        const datos = await Caracteristica.find({categoria, estado:true}).select('_nombre titulo descripcion ruta id estado');
        res.status(200).json({datos});

    }catch(error){
        console.log(error);
    }
}

const eliminarIMG = async (req, res) => {
    try{
        const id = req.params.id;
        const dato = await Caracteristica.findByIdAndUpdate(id, {estado: false}, {new: true});
        res.status(200).json({dato});
    }catch(error){
        console.log(error)
        res.status(400).send({msg: 'Esta fallando el endpoint de eliminación'});
    }
}


module.exports={
    nuevaImgCar,
    imgAll,
    eliminarIMG,
    imgCategoria
}