const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

//crear servidor de express
const app = express();

app.use(express.static('public'));

const port = process.env.PORT || 3000;

//cors
app.use(cors());

//lectura y parseo del body
app.use(express.json());

//get
app.use('/api/auth',require('./routes/auth'));

//manegar rutas
app.get('*' ,(req,res) => {
    res.sendFile(path.resolve(__dirname,'public','index.html'))
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
})
