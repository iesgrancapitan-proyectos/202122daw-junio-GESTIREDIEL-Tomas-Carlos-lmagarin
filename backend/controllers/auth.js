const {
  response
} = require('express');

const {
  generarJWT
} = require('../helpers/jwt');

const bcrypt = require('bcryptjs');
const {
  PrismaClient
} = require('@prisma/client')

const prisma = new PrismaClient()
const {
  v4: uuidv4
} = require('uuid');

const crearUsuario = async (req, res = response) => {

  const {
    username,
    email,
    password,
    rol
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

    //generar JWT
    const token = await generarJWT(id, username);

    //crear usuario de BD
    await prisma.usuarios.create({
      data: {
        id,
        username,
        email,
        password: userPassword,
        rol
      }
    })

    //generar respuesta
    return res.status(201).json({
      ok: true,
      uid: id,
      username,
      token
    })

  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}

const loginUsuario = async (req, res = response) => {

  const {
    email,
    password
  } = req.body;

  try {

    const DBuser = await prisma.usuarios.findUnique({
      where: {
        email: email
      }
    });

    if (!DBuser) {
      return res.status(400).json({
        ok: false,
        msg: 'Credenciales incorrectas'
      })
    }

    //verificar password
    const validPassword = bcrypt.compareSync(password, DBuser.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Credenciales incorrectas'
      })
    }

    //generar JWT
    const token = await generarJWT(DBuser.id, DBuser.username);

    //respuesta del servicio
    return res.status(201).json({
      ok: true,
      uid: DBuser.id,
      username: DBuser.username,
      email: DBuser.email,
      token
    })


  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }

}

const revalidarToken = async (req, res = response) => {

  const {
    uid
  } = req;

  //leer la base de datos
  const DBuser = await prisma.usuarios.findUnique({
    where: {
      id: uid
    }
  });

  const token = await generarJWT(uid, DBuser.username);

  return res.json({
    ok: true,
    uid,
    name: DBuser.username,
    email: DBuser.email,
    token
  })

}

const borrarUsuario = async (req, res = response) => {
  const {
    id
  } = req.params;

  try {

    await prisma.usuarios.delete({
      where: {
        id
      }
    })

    return res.status(200).json({
      ok: true,
      msg: 'Usuario eliminado'
    })

  } catch (error) {
    if (error.meta.cause === 'Record to delete does not exist.') {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe'
      })
    }
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}

module.exports = {
  crearUsuario,
  loginUsuario,
  borrarUsuario,
  revalidarToken
}