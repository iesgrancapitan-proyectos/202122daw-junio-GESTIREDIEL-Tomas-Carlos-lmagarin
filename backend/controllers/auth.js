const {
  response
} = require('express');

const {
  generarJWT
} = require('../helpers/jwt');

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const {
  PrismaClient
} = require('@prisma/client')

const prisma = new PrismaClient()
const {
  v4: uuidv4
} = require('uuid');

const jwt = require('jsonwebtoken');

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
    if (DBuser.last_login == null) {
      await prisma.usuarios.update({
        where: {
          id: DBuser.id
        },
        data: {
          last_login: new Date()
        }
      })
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });
  
      const mailOptions = {
        from: '"Cambiar contraseña"' + process.env.EMAIL,
        to: DBuser.email,
        subject: 'Mensaje de bienvenida a la aplicación',
        html: `
        <h1>Hola ${DBuser.username}</h1>
          <h2>Te recomendamos cambiar la contraseña</h2>
          <p>Para cambiar su contraseña ingrese al siguiente link:</p>
          <a href="${process.env.URL_CLIENT}/auth/new-password/${token}">Cambiar contraseña</a>
        `
      };
  
      await transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
          })
        } else {
          return res.status(200).json({
            ok: true,
            msg: 'Se ha enviado un email con el link para cambiar contraseña'
          })
        }
      });
    }
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

const forgotPassword = async (req, res = response) => {
  const {
    email
  } = req.body;

  if (!email) {
    return res.status(400).json({
      ok: false,
      msg: 'Por favor ingrese un email'
    })
  }

  try {

    const userExist = await prisma.usuarios.findUnique({
      where: {
        email: email
      }
    });

    if (!userExist) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe'
      })
    }

    //Generar token
    const token = await generarJWT(userExist.id, userExist.username);

    //Enviar email con token
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    const mailOptions = {
      from: '"Cambiar contraseña"' + process.env.EMAIL,
      to: email,
      subject: 'Cambiar contraseña',
      html: `
        <h1>Cambiar contraseña</h1>
        <p>Para cambiar su contraseña ingrese al siguiente link:</p>
        <a href="${process.env.URL_CLIENT}/auth/new-password/${token}">Cambiar contraseña</a>
      `
    };

    await transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        return res.status(500).json({
          ok: false,
          msg: 'Por favor hable con el administrador'
        })
      } else {
        return res.status(200).json({
          ok: true,
          msg: 'Se ha enviado un email con el link para cambiar contraseña'
        })
      }
    });

  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }

}


const generateNewPassword = async (req, res = response) => {
  const {
    token
  } = req.params;

  //Obtener id del usuario
  const userId = await jwt.verify(token, process.env.JWT_SECRET_SEED);

  const {
    password
  } = req.body;

  if (!password) {
    return res.status(400).json({
      ok: false,
      msg: 'Por favor ingrese una contraseña'
    })
  }

  try {

    const userExist = await prisma.usuarios.findUnique({
      where: {
        id: userId.uid
      }
    });

    if (!userExist) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe'
      })
    }

    //Encriptar password
    const salt = bcrypt.genSaltSync();
    const newPassword = bcrypt.hashSync(password, salt);

    //Actualizar password
    await prisma.usuarios.update({
      where: {
        id: userId.uid
      },
      data: {
        password: newPassword
      }
    })

    return res.status(200).json({
      ok: true,
      msg: 'Contraseña actualizada'
    })


  } catch (err) {
    console.log(err)
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
  revalidarToken,
  forgotPassword,
  generateNewPassword
}