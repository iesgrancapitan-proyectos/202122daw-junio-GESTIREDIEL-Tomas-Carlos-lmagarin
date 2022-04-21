const jwt = require('jsonwebtoken');
const {response} = require('express');

const validarJWT = (req, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Error en el token'
    });
  }

  try {

    const {uid,name} = jwt.verify(token, process.env.JWT_SECRET_SEED)

    req.uid = uid;
    req.name = name;

  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no valido'
    });
  }
  next();
}

module.exports = {
  validarJWT
}