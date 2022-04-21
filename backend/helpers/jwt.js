const jwt = require('jsonwebtoken');

const generarJWT = (uid, name) => {
  const payload = {
    uid,
    name
  }

  return new Promise((resolve, reject) => {

    jwt.sign(payload, process.env.JWT_SECRET_SEED, {
      expiresIn: process.env.JWT_EXPIRES_IN
    }, (err, token) => {

      if (err) {
        reject(err)
      } else {
        resolve(token);
      }

    })

  })
}

module.exports = {generarJWT}