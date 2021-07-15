const { Router } = require('express');
const { check } = require('express-validator');
const { nuevaImgCar, imgAll, eliminarIMG, imgCategoria } = require('../controllers/caraController')

const router = Router();

router.get('/', imgAll);
router.get('/:categoria',
    [
       check('categoria', 'No se incorporo la categoria').not(),isEmpty()
    ],
imgCategoria);

router.post('/', 
    [
        check('nombre', 'No se incorporo un nombre' ).not().isEmpty(),
        check('titulo', 'Ingresa un titulo').not().isEmpty(),
        check('categoria', 'Ingresa una categoria').not().isEmpty()
    ],
nuevaImgCar
);

router.put('/:id',
    [
        check('id','El id no es valido para mongo').isMongoId()
    ],
eliminarIMG);



module.exports = router;