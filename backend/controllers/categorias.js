const {
  response
} = require('express');
const {
  PrismaClient
} = require('@prisma/client')

const prisma = new PrismaClient()


const crearCategoria = async (req, res = response) => {

  const {
    nombre
  } = req.body;

  try {

    //crear categoria en la BD
    const categoria = await prisma.categoria.create({
      data: {
        nombre
      }
    });

    //generar respuesta
    return res.status(200).json({
      ok: true,
      msg: 'Categoria creada correctamente',
      id:categoria.id
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}

const getAllCategoria = async (req, res = response) => {
  try {

    const categorias = await prisma.categoria.findMany()

    return res.status(200).json(categorias)

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}

const editarCategoria = async (req, res = response) => {
  const {
    id
  } = req.params;
  const {
    nombre
  } = req.body;

  try {

    await prisma.categoria.update({
      where: {
        id: Number(id)
      },
      data: {
        nombre
      }
    });

    //generar respuesta
    return res.status(200).json({
      ok: true,
      msg: 'Categoria editada correctamente'
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}

const borrarCategoria = async (req, res = response) => {
  const {
    id
  } = req.params;

  try {
      
      await prisma.categoria.delete({
        where: {
          id: Number(id)
        }
      });
  
      //generar respuesta
      return res.status(200).json({
        ok: true,
        msg: 'Categoria borrada correctamente'
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
  crearCategoria,
  editarCategoria,
  borrarCategoria,
  getAllCategoria
}