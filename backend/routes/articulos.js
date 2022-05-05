const {Router} = require('express');
const { check } = require('express-validator');
const {crearArticulo,editarArticulo,borrarArticulo,getAllArticulo, entradaArticulo,articuloExist} = require('../controllers/articulos');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

//agregar articulo
router.post('/',[
  check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
  check('referencia', 'La referencia es obligatoria').optional(),
  check('precio_coste', 'El precio de coste es obligatorio').not().isEmpty(),
  check('precio_venta','El precio de venta es obligatorio').not().isEmpty(),
  check('id_categoria','El id de la categoria').not().isEmpty(),
  validarCampos
],crearArticulo)

//editar articulo por id
router.put('/editar/:id',[
  check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
  check('referencia', 'La referencia es obligatoria').optional(),
  check('precio_coste', 'El precio de coste es obligatorio').not().isEmpty(),
  check('precio_venta','El precio de venta es obligatorio').not().isEmpty(),
  check('id_categoria','El id de la categoria').not().isEmpty(),
  validarCampos
],editarArticulo)

router.put('/entrada',[
  check('id_proveedor', 'El id del proveedor es obligatorio').not().isEmpty(),
  check('id_articulo', 'El id del artículo es obligatoria').not().isEmpty(),
  check('cantidad','La cantidad es obligatoria').not().isEmpty(),
  validarCampos
],entradaArticulo)

//borrar articulo por id
router.delete('/:id',borrarArticulo)

//obtener todos los articulos
router.get('/',getAllArticulo)

router.get('/exist/:referencia',articuloExist)


module.exports = router;