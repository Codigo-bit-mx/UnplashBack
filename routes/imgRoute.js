const { Router } = require('express');

const {
    imgPOST   
} = require('../controllers/imgController');

const router = Router();

router.post('/', imgPOST);


module.exports = router;