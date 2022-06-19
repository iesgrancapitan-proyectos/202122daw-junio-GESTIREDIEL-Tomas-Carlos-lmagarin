const {
    Router
} = require('express');
const {
    check
} = require('express-validator');
const {
    getAllReparaciones,
    removeReparacion,
    crearReparacion,
    enviarMail,
    actualizarReparacion,
    getReparacionesByUser,
    addArticulo,
    removeArticulo,
    getArticulos,
    changeState,
    countReparacionTecnico,
    proximasReparaciones
} = require('../controllers/reparaciones');
const {
    validarCampos
} = require('../middlewares/validar-campos');
const router = Router();

//Crear reparacion
router.post('/', [
    check('id_dispositivo', 'El id del dispositivo es obligatorio').not().isEmpty(),
    check('id_tecnico', 'El id del tecnico es obligatorio').not().isEmpty(),
    check('fecha_compromiso', 'La fecha de la reparacion es obligatoria').not().isEmpty().toDate(),
    check('averia', 'La averia es obligatoria').not().isEmpty(),
    check('accesorios', 'Los accesorios son obligatorios').optional(),
    check('observaciones', 'Las observaciones son obligatorias').optional(),
    check('estado', 'El estado de la reparacion es obligatorio').not().isEmpty().isIn(['Pendiente']),
    validarCampos
], crearReparacion);

//Obtener todas reparaciones
router.get('/', getAllReparaciones)

//Actualizar reparacion
router.put('/:id', [
    check('averia', 'La averia es obligatoria').not().isEmpty(),
    check('accesorios', 'Los accesorios son obligatorios').optional(),
    check('observaciones', 'Las observaciones son obligatorias').optional(),
    validarCampos
], actualizarReparacion);

router.put('/estado/:id', [
    check('estado', 'El estado de la reparacion no es correcto.').not().isEmpty().isIn(['Pendiente', 'Terminada', 'Cancelada', 'En reparación']),
    validarCampos
], changeState);

//Enviar mail
router.post('/mail', enviarMail);

//Get reparaciones by user
router.get('/cliente/:id', getReparacionesByUser);

//Get reparaciones by tecnico
router.get('/tecnico/:id', getReparacionesByUser);

//Get reparaciones by tecnico
router.get('/articulos/:id', getArticulos);

//Agregar articulo a la reparación
router.post('/articulo', [
    check('id_articulo', 'El id del articulo es obligatorio').not().isEmpty(),
    check('id_reparacion', 'El id de la reparación es obligatorio').not().isEmpty(),
    validarCampos
], addArticulo)

//Borrar articulo de la reparación
router.put('/reparacion/articulo',[
    check('id_articulo', 'El id del articulo es obligatorio').not().isEmpty(),
    check('id_reparacion', 'El id de la reparación es obligatorio').not().isEmpty(),
    validarCampos
], removeArticulo)


//Contar reparaciones por tecnico
router.get('/countReparaciones',countReparacionTecnico);

//Ultimas 5 reparaciones 
router.get('/nextReparaciones', proximasReparaciones);

module.exports = router;