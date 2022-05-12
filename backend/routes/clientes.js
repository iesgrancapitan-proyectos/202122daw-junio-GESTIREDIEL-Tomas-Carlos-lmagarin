const {Router} = require('express');
const { check } = require('express-validator');
const {crearCliente, getallClientes, editarCliente, getClienteByToken,getDispositivos} = require('../controllers/clientes');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/',[
  check('username', 'El nombre es obligatorio').not().isEmpty(),
  check('telefono', 'El telefono es obligatorio').isLength({min:9}),
  check('email', 'El email es obligatorio').isEmail(),
  check('nif','El nif es obligatorio').not().isEmpty(),
  check('nombre_fiscal','El nombre fiscal es obligatorio').not().isEmpty(),
  check('domicilio','El domicilio es obligatorio').not().isEmpty(),
  check('CP','El codigo postal es obligatorio').not().isEmpty(),
  check('poblacion','El poblacion es obligatorio').not().isEmpty(),
  check('provincia','La provincia es obligatoria').not().isEmpty(),
  check('persona_contacto','La persona de contacto es obligatoria').not().isEmpty(),
  validarCampos
],crearCliente)

router.put('/:id',[
  check('email', 'El email es obligatorio').isEmail(),
  check('nif','El nif es obligatorio').not().isEmpty(),
  check('telefono', 'El telefono es obligatorio').isLength({min: 9}),
  check('nombre_fiscal','El nombre fiscal es obligatorio').not().isEmpty(),
  check('domicilio','El domicilio es obligatorio').not().isEmpty(),
  check('CP','El codigo postal es obligatorio').isNumeric().not().isEmpty(),
  check('poblacion','El poblacion es obligatorio').not().isEmpty(),
  check('provincia','La provincia es obligatoria').not().isEmpty(),
  validarCampos
],editarCliente)

router.get('/dispositivos/:id',getDispositivos)

router.get('/user/:token',getClienteByToken)

router.get('/',getallClientes)


module.exports = router;