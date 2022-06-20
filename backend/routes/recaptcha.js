const {Router} = require('express');
const {verificarReptcha} = require('../controllers/recaptcha');
const router = Router();

router.post('/:token',verificarReptcha)

module.exports = router;