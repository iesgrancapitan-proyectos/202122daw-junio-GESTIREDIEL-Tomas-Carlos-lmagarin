const {Router} = require('express');
const { check } = require('express-validator');
const {getAllReparaciones, removeReparacion,crearReparacion} = require('../controllers/reparaciones');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

//Eliminar reparacion
router.delete('/:id',removeReparacion);

//Crear reparacion
router.post('/',[
    check('id_dispositivo', 'El id del dispositivo es obligatorio').not().isEmpty(),
    check('id_tecnico', 'El id del tecnico es obligatorio').not().isEmpty(),
    check('fecha_reparacion', 'La fecha de la reparacion es obligatoria').not().isEmpty().toDate(),
    check('averia', 'La averia es obligatoria').not().isEmpty(),
    check('accesorios', 'Los accesorios son obligatorios').not().optional(),
    check('observaciones', 'Las observaciones son obligatorias').optional(),
    check('estado', 'El estado de la reparacion es obligatorio').not().isEmpty().isIn(['pendiente','reparado','cancelado','en reparacion']),
    validarCampos
],crearReparacion);

//Obtener todas reparaciones
router.get('/',getAllReparaciones)

module.exports = router;