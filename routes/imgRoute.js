const { Router } = require('express');

const {
    imgPOST,
    imgDELETE
} = require('../controllers/imgController');

const router = Router();

router.post('/', imgPOST);

router.delete('/:archivo', imgDELETE);

module.exports = router;