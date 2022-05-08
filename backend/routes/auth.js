const {Router} = require('express');
const { check } = require('express-validator');
const {crearUsuario,loginUsuario,revalidarToken, borrarUsuario,forgotPassword,generateNewPassword,getRolByToken} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/new',[
  check('username', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El email es obligatorio').isLength({min:3,max:50}).isEmail(),
  check('password', 'El password es obligatorio').isLength({min:6}).not().isEmpty(),
  check('rol','El rol es obligatorio').not().isEmpty(),
  validarCampos
],crearUsuario)

router.put('/password-reset',[
  check('email', 'El email es obligatorio').isEmail()
],forgotPassword)

router.put("/new-password/:token",generateNewPassword)

router.post('/', [
  check('email', 'El email es obligatorio').isLength({min:3,max:50}).isEmail(),
  check('password', 'El password es obligatorio').isLength({min:6}).not().isEmpty(),
  validarCampos
] ,loginUsuario)

router.delete('/:id',borrarUsuario)

router.get('/renew',validarJWT,revalidarToken)

router.get('/rol/:token',getRolByToken)

module.exports = router;