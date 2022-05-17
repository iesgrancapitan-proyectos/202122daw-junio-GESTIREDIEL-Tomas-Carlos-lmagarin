const {
  response
} = require('express');
const {
  PrismaClient
} = require('@prisma/client')
const nodemailer = require('nodemailer');
const prisma = new PrismaClient()

const actualizarReparacion=async(req,res=response)=>{

  const {id}=req.params;
  id=Number(id);

  const {
    id_dispositivo,
    id_tecnico,
    fecha_reparacion,
    averia,
    accesorios,
    observaciones,
    estado,
  } = req.body;

  try{

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
    
    const reparacion = await prisma.reparacion.update({
      where: {
        id: Number(id)
      },
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
      msg: 'Reparacion actualizada correctamente',
      reparacion
    })


  }catch(error){
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

    if(!tecnico){
      return res.status(400).json({
        ok: false,
        msg: 'El tecnico no existe'
      })
    }


    const dispositivo= await prisma.dispositivo.findUnique({
      where: {
        id: Number(id_dispositivo)
      }
    });

    if(!dispositivo){
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
  console.log(reparaciones);
  const articulos_reparacion = await prisma.articulo_reparacion.findMany()

  if (reparaciones.length < 0) {
    return res.status(404).json({
      ok: false,
      msg: 'No hay reparaciones'
    })
  }

  let data = [];
  
  reparaciones.forEach( (reparacion, i) => {
  
    let articulos=[]
    console.log(articulos_reparacion, reparacion.id_reparacion);
    articulos_reparacion.filter((articulo) => articulo.id_reparacion == reparacion.id_reparacion).forEach((articulo)=>{
      articulos.push(articulo.id_articulo)
    })

    data[i]={
      id:reparacion.id,
      estado: reparacion.estado,
      fecha_compromiso: reparacion.fecha_compromiso,
      averia: reparacion.averia,
      accesorios: reparacion.accesorios,
      observaciones: reparacion.observaciones,
      articulos: articulos,
      dispositivo:{
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
      tecnico:{
        id: reparacion.id_tecnico,
        nombre: reparacion.nombre,
        id_usuario: reparacion.id_usuario
      }
    }
   
  });

  return res.status(200).json(data)
}

const enviarMail = async (req, res = response) => {

  const {email,mensaje} = req.body;
  
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

module.exports = {
  getAllReparaciones,
  removeReparacion,
  crearReparacion,
  actualizarReparacion,
  enviarMail
}