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

const crearCliente = async (req, res = response) => {

  const {
    username,
    email,
    password,
    nif,
    nombre_fiscal,
    domicilio,
    CP,
    poblacion,
    provincia,
    persona_contacto
  } = req.body;

  try {

    //verificar email
    let usuario = await prisma.usuarios.findUnique({
      where: {
        email: email
      }
    });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario con ese email ya existe'
      })
    }

    //generate uuid
    const id = uuidv4();

    //hash password
    const salt = bcrypt.genSaltSync();
    const userPassword = bcrypt.hashSync(password, salt);

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
    await prisma.usuarios.create({
      data: {
        id,
        username,
        email,
        password: userPassword,
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
        username,
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
        persona_contacto
      }
    })

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
module.exports = {
  crearCliente,
  getallClientes,
  editarCliente,
  getClienteByToken
}