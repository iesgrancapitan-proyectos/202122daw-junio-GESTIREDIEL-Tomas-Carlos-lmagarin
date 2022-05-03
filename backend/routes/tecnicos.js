const {Router} = require('express');
const { check } = require('express-validator');
const {crearTecnico, getallTecnicos, editarTecnico} = require('../controllers/tecnicos');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/',[
  check('username', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El email es obligatorio y ser un email valido').isEmail(),
  check('password', 'El password es obligatorio').not().isEmpty(),
  check('password', 'El password debe de tener al menos 6 caracteres').isLength({min:6}),
  check('nombre','El nombre es obligatorio').not().isEmpty(),
  validarCampos
],crearTecnico)

router.put('/:id',[
  check('username', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El email es obligatorio').isEmail(),
  check('nombre','El nombre es obligatorio').not().isEmpty(),
  validarCampos
],editarTecnico)


router.get('/',getallTecnicos)


module.exports = router;