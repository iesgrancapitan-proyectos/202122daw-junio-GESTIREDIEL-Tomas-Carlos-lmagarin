const {
  response
} = require('express');
const {
  PrismaClient
} = require('@prisma/client')

const prisma = new PrismaClient()

const crearReparacion = async (req, res = response) => {

  const {
    id_dispositivo,
    id_tecnico,
    fecha_reparacion,
    averia,
    accesorios,
    observaciones,
    estado,
  } = req.body;


  try {

    const tecnico = await prisma.tecnico.findUnique({
      where: {
        id: Number(id_tecnico)
      }
    });

    if (!tecnico) {
      return res.status(400).json({
        ok: false,
        msg: 'El tecnico no existe'
      })
    }

    const dispositivo = await prisma.dispositivo.findUnique({
      where: {
        id: Number(id_dispositivo)
      }
    });

    if (!dispositivo) {
      return res.status(400).json({
        ok: false,
        msg: 'El dispositivo no existe'
      })
    }

    await prisma.reparacion.create({
      data: {
        id_dispositivo,
        id_tecnico,
        estado,
        accesorios,
        fecha_compromiso: fecha_reparacion,
        averia,
        observaciones
      }
    })

    return res.status(200).json({
      ok: true,
      msg: 'Reparacion creada correctamente',
    })



  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error al crear reparacion',
    });
  }

}

const removeReparacion = async (req, res = response) => {

  const {
    id
  } = req.params;

  try {

    await prisma.reparacion.delete({
      where: {
        id: Number(id)
      }
    })

    return res.status(200).json({
      ok: true,
      msg: 'Reparacion eliminada correctamente'
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}

const getAllReparaciones = async (req, res = response) => {

  const reparaciones = await prisma.$queryRaw `
    select * from reparacion r inner join tecnico t on r.id_tecnico=t.id inner join dispositivo d on r.id_dispositivo=d.id inner join cliente c on d.id_cliente=c.id inner join usuarios u on c.id_usuario=u.id
  `

  if (reparaciones.length < 0) {
    return res.status(404).json({
      ok: false,
      msg: 'No hay reparaciones'
    })
  }

  let data = [];

   reparaciones.forEach( (reparacion, i) => {

    data[i] = {
      id: reparacion.id,
      estado: reparacion.estado,
      accesorios: reparacion.accesorios,
      fecha_compromiso: reparacion.fecha_compromiso,
      averia: reparacion.averia,
      observaciones: reparacion.observaciones,
      dispositivo: {
        id: reparacion.id_dispositivo,
        tipo: reparacion.tipo,
        marca: reparacion.marca,
        modelo: reparacion.modelo,
        codigo_desbloqueo: reparacion.codigo_desbloqueo,
        pin_sim: reparacion.pin_sim,
      },
      cliente: {
        id: reparacion.id_cliente,
        email: reparacion.email,
        nif: reparacion.nif,
        nombre_fiscal: reparacion.nombre_fiscal,
        telefono: reparacion.telefono,
        domicilio: reparacion.domicilio,
        cp: reparacion.CP,
        poblacion: reparacion.poblacion,
        provincia: reparacion.provincia,
        persona_contacto: reparacion.persona_contacto,
        id_usuario: reparacion.id_usuario
      },
      tecnico: {
        id: reparacion.id_tecnico,
        nombre: reparacion.nombre,
      }
    }

    
  });

  return res.status(200).json(data)
}

module.exports = {
  getAllReparaciones,
  removeReparacion,
  crearReparacion
}