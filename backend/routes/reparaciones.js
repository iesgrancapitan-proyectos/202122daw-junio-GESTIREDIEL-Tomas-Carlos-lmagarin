const {Router} = require('express');
const {getAllReparaciones} = require('../controllers/reparaciones');
const router = Router();

router.get('/',getAllReparaciones)

module.exports = router;