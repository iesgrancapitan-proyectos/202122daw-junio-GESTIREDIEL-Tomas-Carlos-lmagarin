const {
  response,
  request
} = require('express');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Here, HTML form is submit
const verificarReptcha = async (req = request, res = response) => {
  // getting site key from client side
  const {
    token
  } = req.params;
  // Put secret key here, which we get from google console
  const secret_key = process.env.RECAPTCHA_SECRET_KEY;

  // Hitting POST request to the URL, Google will
  // respond with success or error scenario.
  const url =
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;

  // Making POST request to verify captcha
  await fetch(url, {
      method: "post",
    })
    .then((response) => response.json())
    .then((google_response) => {

      // google_response is the object return by
      // google as a response 
      if (google_response.success == true) {
        //   if captcha is verified
        return res.send({
          response: true
        });
      } else {
        // if captcha is not verified
        return res.send({
          response: false
        });
      }
    })
    .catch((error) => {
      // Some error while verify captcha
      return res.json({
        error
      });
    });
}

module.exports = {
  verificarReptcha
}