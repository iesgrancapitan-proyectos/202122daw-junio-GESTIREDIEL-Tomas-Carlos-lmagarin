const {Router} = require('express');
const { check } = require('express-validator');
const {crearProveedor,editarProveedor,borrarProveedor, getAllProveedor} = require('../controllers/proveedores');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

//agregar proveedor
router.post('/',[
  check('nombre_fiscal', 'La nombre fiscal es obligatorio').not().isEmpty(),
  check('nombre_comercial', 'La nombre comercial es obligatorio').not().isEmpty(),
  validarCampos
],crearProveedor)

//editar proveedor por id
router.put('/:id',[
  check('nombre_fiscal', 'La nombre fiscal es obligatorio').not().isEmpty(),
  check('nombre_comercial', 'La nombre comercial es obligatorio').not().isEmpty(),
  validarCampos
],editarProveedor)

//borrar proveedor por id
router.delete('/:id',borrarProveedor)

//obtener todos los proveedores
router.get('/',getAllProveedor)


module.exports = router;