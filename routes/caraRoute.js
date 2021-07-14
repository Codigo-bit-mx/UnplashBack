const { Router } = require('express');
const { check } = require('express-validator');
const { nuevaImgCar, imgAll, eliminarIMG, imgCategoria } = require('../controllers/caraController')

const router = Router();

router.get('/', imgAll);
router.get('/:categoria', imgCategoria)
router.post('/', 
// [
//     check('nombre', 'Sube un archivo' ).not().isEmpty()
// ],
    nuevaImgCar
);

router.put('/:id', eliminarIMG);



module.exports = router;