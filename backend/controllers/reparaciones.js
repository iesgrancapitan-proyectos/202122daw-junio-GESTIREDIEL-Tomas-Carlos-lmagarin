const {
  response
} = require('express');
const {
  PrismaClient
} = require('@prisma/client')
const nodemailer = require('nodemailer');
const prisma = new PrismaClient()

const actualizarReparacion = async (req, res = response) => {

  const {
    id
  } = req.params;

  const {
    averia,
    accesorios,
    observaciones
  } = req.body;

  try {

    const reparacion = await prisma.reparacion.update({
      where: {
        id: Number(id)
      },
      data: {
        accesorios,
        averia,
        observaciones
      }
    })

    return res.status(200).json({
      ok: true,
      msg: 'Reparacion actualizada correctamente',
      reparacion
    })


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}

const crearReparacion = async (req, res = response) => {

  const {
    articulos,
    id_dispositivo,
    id_tecnico,
    fecha_compromiso,
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
        fecha_compromiso,
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
    select r.*,t.*,d.*,c.*,u.*, r.id as id_reparacion
    from reparacion r 
    inner join tecnico t on r.id_tecnico=t.id 
    inner join dispositivo d on r.id_dispositivo=d.id 
    inner join cliente c on d.id_cliente=c.id 
    inner join usuarios u on c.id_usuario=u.id
  `

  const articulos_reparacion = await prisma.articulo_reparacion.findMany()

  if (reparaciones.length < 0) {
    return res.status(404).json({
      ok: false,
      msg: 'No hay reparaciones'
    })
  }

  let data = [];

  reparaciones.forEach((reparacion, i) => {

    let articulos = []
    articulos_reparacion.filter((articulo) => articulo.id_reparacion == reparacion.id_reparacion).forEach((articulo) => {

      articulos.push(articulo.id_articulo);
    })

    data[i] = {
      id: reparacion.id_reparacion,
      estado: reparacion.estado,
      fecha_compromiso: reparacion.fecha_compromiso,
      averia: reparacion.averia,
      accesorios: reparacion.accesorios,
      observaciones: reparacion.observaciones,
      articulos,
      dispositivo: {
        id: reparacion.id_dispositivo,
        id_cliente: reparacion.id_cliente,
        tipo: reparacion.tipo,
        marca: reparacion.marca,
        modelo: reparacion.modelo,
        codigo_desbloqueo: reparacion.codigo_desbloqueo,
        pin_sim: reparacion.pin_sim,
        numero_serie: reparacion.numero_serie,
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
        id_usuario: reparacion.id_usuario
      }
    }

  });

  return res.status(200).json(data)
}

const getReparacionesByUser = async (req, res = response) => {

  const {
    id
  } = req.params;
  let data = []
  try {
    const usuario = await prisma.usuarios.findUnique({
      where: {
        id
      }
    })

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe'
      })
    }

    let reparaciones;

    if (usuario.rol == "cliente") {
      reparaciones = await prisma.$queryRaw `
      select reparacion.id,estado,fecha_compromiso,averia,observaciones,dispositivo.id as id_dispositivo,tipo,marca,modelo from reparacion inner join dispositivo on reparacion.id_dispositivo=dispositivo.id inner join cliente on dispositivo.id_cliente=cliente.id inner join usuarios on cliente.id_usuario=usuarios.id where usuarios.id=${id} 

    `
    } else if (usuario.rol == "tecnico") {
      reparaciones = await prisma.$queryRaw `
      select reparacion.id,estado,fecha_compromiso, accesorios,averia,observaciones,dispositivo.id as id_dispositivo,tipo,marca,modelo from reparacion inner join dispositivo on reparacion.id_dispositivo=dispositivo.id inner join tecnico on reparacion.id_tecnico=tecnico.id inner join usuarios on tecnico.id_usuario=usuarios.id where usuarios.id=${id}
    `
    } else {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no es cliente ni tecnico'
      })
    }

    const articulos_reparacion = await prisma.articulo_reparacion.findMany()

    reparaciones.forEach((reparacion, i) => {

      let articulos = []
      articulos_reparacion.filter((articulo) => articulo.id_reparacion == reparacion.id_reparacion).forEach((articulo) => {

        articulos.push(articulo.id_articulo);
      })

      data[i] = {
        id: reparacion.id,
        estado: reparacion.estado,
        fecha_compromiso: reparacion.fecha_compromiso,
        accesorios: reparacion.accesorios,
        averia: reparacion.averia,
        observaciones: reparacion.observaciones,
        articulos,
        dispositivo: {
          id: reparacion.id_dispositivo,
          tipo: reparacion.tipo,
          marca: reparacion.marca,
          modelo: reparacion.modelo,
          fecha_compromiso: reparacion.fecha_compromiso,
        }
      }
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error al buscar usuario'
    })
  }

  return res.status(200).json(data)

}

const enviarMail = async (req, res = response) => {

  const {
    email,
    mensaje
  } = req.body;

  //Enviar email con token
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: '"GESTIREDIEL"' + process.env.EMAIL,
    to: email,
    subject: 'Mensaje de GESTIREDIEL',
    html: `
      ${mensaje}
    `
  };

  await transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      return res.status(500).json({
        ok: false,
        msg: 'Por favor hable con el administrador'
      })
    }
  });

  return res.status(200).json({
    ok: true,
    msg: 'Mail enviado correctamente'
  })

}

const addArticulo = async (req, res = response) => {

  const {
    id_articulo,
    id_reparacion
  } = req.body;

  try {

    const articulo_reparacion = await prisma.articulo_reparacion.findFirst({
      where: {
        id_articulo,
        id_reparacion
      }
    })

    //Actualizar stock del articulo
    await prisma.$queryRaw `
      update proveedor_articulo set stock = stock - 1 where id_articulo = ${id_articulo} and stock > 0 LIMIT 1
    `

    const stock_articulo = await prisma.$queryRaw `
      select * from proveedor_articulo where id_articulo = ${id_articulo} and stock > 0 LIMIT 1
    `

    if (stock_articulo.length == 0) {
      return res.status(400).json({
        ok: false,
        msg: 'No hay stock del articulo'
      })
    }

    if (articulo_reparacion) {
      await prisma.$queryRaw `
      update articulo_reparacion set cantidad = cantidad + 1 where id_articulo = ${id_articulo} and id_reparacion = ${id_reparacion}
      `

    } else {
      await prisma.articulo_reparacion.create({
        data: {
          id_articulo,
          id_reparacion,
          cantidad: 1
        }
      })
    }



    return res.status(200).json({
      ok: true,
      msg: 'Articulo añadido correctamente'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error al añadir articulo'
    })

  }
}

const removeArticulo = async (req, res = response) => {

  const {
    id_articulo,
    id_reparacion
  } = req.body;

  try {

    const articulo_reparacion = await prisma.$queryRaw `
      select * from articulo_reparacion where id_articulo = ${id_articulo} and id_reparacion = ${id_reparacion}
    `

    console.log(articulo_reparacion[0].cantidad);
    if (articulo_reparacion[0].cantidad <= 1) {
      await prisma.$queryRaw `
      delete from articulo_reparacion where id_articulo = ${id_articulo} and id_reparacion = ${id_reparacion}
      `
    } else {
      await prisma.$queryRaw `
      update articulo_reparacion set cantidad = cantidad - 1 where id_articulo = ${id_articulo} and id_reparacion = ${id_reparacion}
      `
    }

    //Actualizar stock del articulo
    await prisma.$queryRaw `
      update proveedor_articulo set stock = stock + 1 where id_articulo = ${id_articulo}  LIMIT 1
    `

    return res.status(200).json({
      ok: true,
      msg: 'Articulo borrado correctamente'
    })
  } catch (error) {

    return res.status(500).json({
      ok: false,
      msg: 'Error al borrar articulo'
    })

  }
}

const getArticulos = async (req, res = response) => {

  const {
    id
  } = req.params;

  try {

    const articulos_reparacion = await prisma.articulo_reparacion.findMany({
      where: {
        id_reparacion: Number(id)
      }
    })

    const articulos = await prisma.articulo.findMany({
      where: {
        id: {
          in: articulos_reparacion.map((articulo) => articulo.id_articulo)
        }
      }
    })

    //agregamos la cantidad de articulos a cada articulo
    articulos.forEach((articulo) => {
        articulos_reparacion.forEach((articulo_reparacion) => {
  
          if (articulo.id == articulo_reparacion.id_articulo) {
            articulo.cantidad = articulo_reparacion.cantidad
          }
  
        })
    })

    return res.status(200).json(articulos)

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error al buscar articulos'
    })
  }
}

const changeState = async (req, res = response) => {

  const {id} = req.params;
  const {estado} = req.body;

  try {

    await prisma.reparacion.update({
      where: {
        id
      },
      data: {
        estado
      }
    })

    return res.status(200).json({
      ok: true,
      msg: 'Estado cambiado correctamente'
    })
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error al cambiar estado'
    })
  }
}


module.exports = {
  getAllReparaciones,
  removeReparacion,
  crearReparacion,
  actualizarReparacion,
  enviarMail,
  getReparacionesByUser,
  addArticulo,
  removeArticulo,
  getArticulos,
  changeState
}