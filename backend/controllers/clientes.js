const {
  response
} = require('express');
const bcrypt = require('bcryptjs');
const {
  PrismaClient
} = require('@prisma/client')
const jwt=require('jsonwebtoken');
const prisma = new PrismaClient()
const {
  v4: uuidv4
} = require('uuid');
const {
  generarJWT
} = require('../helpers/jwt');
const nodemailer = require('nodemailer');

const crearCliente = async (req, res = response) => {

  let {
    username,
    email,
    nif,
    nombre_fiscal,
    domicilio,
    CP,
    poblacion,
    provincia,
    persona_contacto
  } = req.body;

  CP=CP.toString();

  try {

    //verificar email
    let usuario = await prisma.usuarios.findUnique({
      where: {
        email: email
      }
    });
    console.log(usuario)
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario con ese email ya existe'
      })
    }
    

    //generate uuid
    const id = uuidv4();

    //verificar email
    let cliente = await prisma.cliente.findUnique({
      where: {
        nif: nif
      }
    });

    if (cliente) {
      return res.status(400).json({
        ok: false,
        msg: 'El cliente con ese nif ya existe'
      })
    }

    //crear usuario en la BD
    const user=await prisma.usuarios.create({
      data: {
        id,
        username,
        email,
        password: "",
        rol: "cliente"
      }
    });

    
    //crear cliente en la BD
    await prisma.cliente.create({
      data: {
        nif,
        nombre_fiscal,
        domicilio,
        CP,
        poblacion,
        provincia,
        persona_contacto,
        id_usuario: id
      }
    })

     //Generar token
     const token = await generarJWT(user.id,user.username);

     //Enviar email con token
     const transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
         user: process.env.EMAIL,
         pass: process.env.PASSWORD
       }
     });
 
     const mailOptions = {
       from: '"Nueva contraseña"' + process.env.EMAIL,
       to: email,
       subject: 'Crea tu contraseña',
       html: `
         <h1>Crea tu contraseña</h1>
         <p>Para crear su contraseña ingrese al siguiente link:</p>
         <a href="${process.env.URL_CLIENT}/auth/new-password/${token}">Cambiar contraseña</a>
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

    //generar respuesta
    return res.status(200).json({
      ok: true,
      uid: id,
      username,
      email
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}

const getallClientes = async (req, res = response) => {
  try {

    const clientes = await prisma.$queryRaw `
      SELECT id_usuario,username,email,nif,nombre_fiscal,domicilio,CP,poblacion,provincia,persona_contacto,registered
      FROM cliente, usuarios
      WHERE cliente.id_usuario = usuarios.id  
    `

    return res.status(200).json(clientes)

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}

const getClienteByToken = async (req, res = response) => {
  const {
    token
  } = req.params;
  const idCliente = await jwt.verify(token, process.env.JWT_SECRET_SEED);
  try {
    const {id} = await prisma.usuarios.findUnique({
      where: {
        id: idCliente.uid
      }
    });
    const cliente = await prisma.cliente.findUnique({
      where: {
        id_usuario: id
      }
    });
    if(!cliente){
      return res.status(400).json({
        ok:false,
        msg:'El cliente no existe'
      })
    }
    return res.status(200).json(cliente)
  }catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }

}

const editarCliente = async (req, res = response) => {
  const {
    id
  } = req.params;
  const {
    email,
    nif,
    nombre_fiscal,
    domicilio,
    CP,
    poblacion,
    provincia
  } = req.body;

  try {

    //verificar email
    let usuario = await prisma.$queryRaw `
      SELECT * FROM usuarios WHERE email = ${email} AND id != ${id}
    `

    if (usuario.length > 0) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario con ese email ya existe'
      })
    }

    //verificar email
    let cliente = await prisma.$queryRaw `
      SELECT * FROM cliente WHERE nif = ${nif} AND id_usuario != ${id}
    `

    if (cliente.length > 0) {
      return res.status(400).json({
        ok: false,
        msg: 'El cliente con ese nif ya existe'
      })
    }

    //crear usuario en la BD
    await prisma.usuarios.update({
      where: {
        id
      },
      data: {
        email,
      }
    });

    const clienteUpdate = await prisma.cliente.findFirst({
      where: {
        id_usuario: id
      }
    });

    //crear cliente en la BD
    await prisma.cliente.update({
      where: {
        id: clienteUpdate.id
      },
      data: {
        nif,
        nombre_fiscal,
        domicilio,
        CP,
        poblacion,
        provincia,
      }
    })

    //generar respuesta
    return res.status(200).json({
      ok: true,
      uid: id,
      email
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}
module.exports = {
  crearCliente,
  getallClientes,
  editarCliente,
  getClienteByToken
}