const {Router} = require('express');
const { check } = require('express-validator');
const {crearCategoria,editarCategoria,borrarCategoria,getAllCategoria} = require('../controllers/categorias');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

//agregar categoria
router.post('/',[
  check('nombre', 'La nombre es obligatorio').not().isEmpty(),
  validarCampos
],crearCategoria)

//editar categoria por id
router.put('/:id',[
  check('nombre', 'La nombre es obligatorio').not().isEmpty(),
  validarCampos
],editarCategoria)

//borrar categoria por id
router.delete('/:id',borrarCategoria)

//obtener todos los categorias
router.get('/',getAllCategoria)


module.exports = router;