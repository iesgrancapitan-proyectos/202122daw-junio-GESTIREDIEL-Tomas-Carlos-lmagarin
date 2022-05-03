const {
  response
} = require('express');
const bcrypt = require('bcryptjs');
const {
  PrismaClient
} = require('@prisma/client')

const prisma = new PrismaClient()
const {
  v4: uuidv4
} = require('uuid');

const crearTecnico = async (req, res = response) => {

  const {
    username,
    email,
    password,
    nombre
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

    //crear usuario en la BD
    await prisma.usuarios.create({
      data: {
        id,
        username,
        email,
        password: userPassword,
        rol: "tecnico"
      }
    });

    //crear cliente en la BD
    await prisma.tecnico.create({
      data: {
        nombre,
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

const getallTecnicos = async (req, res = response) => {
  try {

    const tecnicos = await prisma.$queryRaw `
      SELECT id_usuario,username,email,nombre,registered,last_login, (SELECT COUNT(*) FROM reparacion WHERE tecnico.id = reparacion.id_tecnico) AS reparaciones
      FROM tecnico, usuarios
      WHERE tecnico.id_usuario = usuarios.id  
    `

    return res.status(200).json(tecnicos)

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}

const editarTecnico = async (req, res = response) => {
  const {
    id
  } = req.params;
  const {
    username,
    email,
    nombre
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

    const tecnicoUpdate = await prisma.tecnico.findFirst({
      where: {
        id_usuario: id
      }
    });

    //crear cliente en la BD
    await prisma.tecnico.update({
      where: {
        id: tecnicoUpdate.id
      },
      data: {
        nombre
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
  crearTecnico,
  getallTecnicos,
  editarTecnico
}