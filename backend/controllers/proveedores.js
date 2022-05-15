const {
  response
} = require('express');
const {
  PrismaClient
} = require('@prisma/client')

const prisma = new PrismaClient()

const {
  ValidateSpanishID
} = require('../helpers/validarNIF')


const crearProveedor = async (req, res = response) => {

  const {
    nombre_fiscal,
    nombre_comercial,
    cif,
    direccion,
    cp,
    telefono,
    email
  } = req.body;

  try {

    //validar cif
    const validNIF = ValidateSpanishID(cif)
    if (validNIF.valid === false || validNIF.type !== 'cif') {
      return res.status(400).json({
        ok: false,
        msg: 'El cif no es valido'
      })
    }
    //crear categoria en la BD
    await prisma.proveedor.create({
      data: {
        nombre_fiscal,
        nombre_comercial,
        cif,
        direccion,
        cp,
        telefono,
        email
      }
    });

    //generar respuesta
    return res.status(200).json({
      ok: true,
      msg: 'Proveedor creado correctamente'
    })

  } catch (error) {
    if (error.meta.target === 'cif') {
      return res.status(400).json({
        ok: false,
        msg: 'El cif ya existe'
      })
    } else if (error.meta.target === 'nombre_fiscal') {
      return res.status(400).json({
        ok: false,
        msg: 'El nombre fiscal ya existe'
      })
    }
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}

const getAllProveedor = async (req, res = response) => {
  try {

    const proveedores = await prisma.proveedor.findMany()


    return res.status(200).json(proveedores)

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}

const editarProveedor = async (req, res = response) => {
  const {
    id
  } = req.params;
  const {
    nombre_fiscal,
    nombre_comercial,
    cif,
    direccion,
    cp,
    telefono,
    email
  } = req.body;

  try {

    const validNIF = ValidateSpanishID(cif)
    if (validNIF.valid === false || validNIF.type !== 'cif') {
      return res.status(400).json({
        ok: false,
        msg: 'El cif no es valido'
      })
    }

    await prisma.proveedor.update({
      where: {
        id: Number(id)
      },
      data: {
        nombre_fiscal,
        nombre_comercial,
        cif,
        direccion,
        cp,
        telefono,
        email
      }
    });

    //generar respuesta
    return res.status(200).json({
      ok: true,
      msg: 'Proveedor editado correctamente'
    })

  } catch (error) {
    if (error.meta.target === 'cif') {
      return res.status(400).json({
        ok: false,
        msg: 'El cif ya existe'
      })
    } else if (error.meta.target === 'nombre_fiscal') {
      return res.status(400).json({
        ok: false,
        msg: 'El nombre fiscal ya existe'
      })
    }
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}

const borrarProveedor = async (req, res = response) => {
  const {
    id
  } = req.params;

  try {

    await prisma.proveedor.delete({
      where: {
        id: Number(id)
      }
    });

    //generar respuesta
    return res.status(200).json({
      ok: true,
      msg: 'Proveedor borrado correctamente'
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
  crearProveedor,
  editarProveedor,
  borrarProveedor,
  getAllProveedor
}