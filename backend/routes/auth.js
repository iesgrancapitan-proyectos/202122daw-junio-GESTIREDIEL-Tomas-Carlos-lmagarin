const {Router} = require('express');
const { check } = require('express-validator');
const {crearUsuario,loginUsuario,revalidarToken, borrarUsuario} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/new',[
  check('username', 'El nombre es obligatorio').isLength({min:3,max:20}).not().isEmpty(),
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'El password es obligatorio').isLength({min:6}).not().isEmpty(),
  check('rol','El rol es obligatorio').not().isEmpty(),
  validarCampos
],crearUsuario)

router.post('/', [
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'El password es obligatorio').isLength({min:6}).not().isEmpty(),
  validarCampos
] ,loginUsuario)

router.delete('/:id',borrarUsuario)

router.get('/renew',validarJWT,revalidarToken)

module.exports = router;