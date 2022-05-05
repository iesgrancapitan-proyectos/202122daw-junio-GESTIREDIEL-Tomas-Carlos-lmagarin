const {
  response
} = require('express');
const {
  PrismaClient
} = require('@prisma/client')

const prisma = new PrismaClient()


const crearArticulo = async (req, res = response) => {

  const {
    descripcion,
    referencia,
    precio_coste,
    precio_venta,
    id_categoria,
  } = req.body;

  try {

    if (referencia) {
      const articuloExist = await prisma.articulo.findUnique({
        where: {
          referencia
        }
      })
  
      if (articuloExist) {
        return res.status(400).json({
          ok: false,
          msg: 'El articulo ya existe'
        })
      }
    }
    

    //crear articulo en la BD
    await prisma.articulo.create({
      data: {
        descripcion,
        referencia,
        precio_coste,
        precio_venta,
        id_categoria
      }
    });

    //generar respuesta
    return res.status(200).json({
      ok: true,
      msg: 'Articulo creado correctamente'
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}

const getAllArticulo = async (req, res = response) => {
  try {

    const tecnicos = await prisma.$queryRaw `
      SELECT id,descripcion,referencia,precio_coste,precio_venta,id_categoria, 
      (SELECT nombre FROM categoria WHERE articulo.id_categoria = categoria.id) AS categoria,
      (SELECT SUM(stock) FROM proveedor_articulo WHERE proveedor_articulo.id_articulo = articulo.id) AS stock
      FROM articulo
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

const editarArticulo = async (req, res = response) => {
  const {
    id
  } = req.params;
  const {
    descripcion,
    referencia,
    precio_coste,
    precio_venta,
    id_categoria
  } = req.body;

  try {

    const articuloExist = await prisma.$queryRaw `
      SELECT * FROM articulo WHERE referencia = ${referencia} AND id != ${id}
    `

    if (articuloExist.length > 0) {
      return res.status(400).json({
        ok: false,
        msg: 'El articulo con esa referencia ya existe'
      })
    }

    await prisma.articulo.update({
      where: {
        id: Number(id)
      },
      data: {
        descripcion,
        referencia,
        precio_coste,
        precio_venta,
        id_categoria
      }
    });

    //generar respuesta
    return res.status(200).json({
      ok: true,
      msg: 'Articulo editado correctamente'
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}

const borrarArticulo = async (req, res = response) => {
  const {
    id
  } = req.params;

  try {
      
      await prisma.articulo.delete({
        where: {
          id: Number(id)
        }
      });
  
      //generar respuesta
      return res.status(200).json({
        ok: true,
        msg: 'Articulo borrado correctamente'
      })
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: 'Por favor hable con el administrador'
      })
    }
}


const entradaArticulo = async (req, res = response) => {
  const {
    id_articulo,
    id_proveedor,
    cantidad,
  } = req.body;

  try {
    
    await prisma.$queryRaw `
      UPDATE proveedor_articulo SET stock = stock + ${cantidad}
      WHERE id_articulo = ${id_articulo} AND id_proveedor = ${id_proveedor}
    `

    //generar respuesta
    return res.status(200).json({
      ok: true,
      msg: 'Entrada de articulo realizada correctamente'
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}

const articuloExist = async (req, res = response) => {
  const {
    referencia
  } = req.params;

  try {
    const articuloExist = await prisma.articulo.findUnique({
      where: {
        referencia
      }
    })

    if (articuloExist) {
      return res.status(400).json({
        ok: false,
        msg: 'Esa referencia ya existe'
      })
    } else {
      return res.status(200).json({
        ok: true,
        msg: 'Esa referencia no existe'
      })
      
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}

module.exports = {
  crearArticulo,
  editarArticulo,
  borrarArticulo,
  getAllArticulo,
  entradaArticulo,
  articuloExist
}