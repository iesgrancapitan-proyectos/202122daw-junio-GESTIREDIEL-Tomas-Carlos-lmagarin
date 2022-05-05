const {
  response
} = require('express');
const {
  PrismaClient
} = require('@prisma/client')

const prisma = new PrismaClient()


const crearProveedor = async (req, res = response) => {

  const {
    nombre_fiscal,
    nombre_comercial
  } = req.body;

  try {


    const proveedor = await prisma.proveedor.findUnique({
      where: {
        nombre_fiscal
      }
    })

    if (proveedor) {
      return res.status(400).json({
        ok: false,
        msg: 'El proveedor ya existe'
      })
    }

    //crear categoria en la BD
    await prisma.proveedor.create({
      data: {
        nombre_fiscal,
        nombre_comercial
      }
    });

    //generar respuesta
    return res.status(200).json({
      ok: true,
      msg: 'Proveedor creado correctamente'
    })

  } catch (error) {
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
    nombre_comercial
  } = req.body;

  try {

    await prisma.proveedor.update({
      where: {
        id: Number(id)
      },
      data: {
        nombre_fiscal,
        nombre_comercial
      }
    });

    //generar respuesta
    return res.status(200).json({
      ok: true,
      msg: 'Proveedor editado correctamente'
    })

  } catch (error) {
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