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

    if (precio_coste >= precio_venta) {
      return res.status(400).json({
        ok: false,
        msg: 'El precio de venta debe ser mayor que el precio de coste'
      })
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

    const articulos = await prisma.$queryRaw `
    SELECT id,descripcion,referencia,precio_coste,precio_venta,id_categoria, 
    (SELECT nombre FROM categoria WHERE articulo.id_categoria = categoria.id) AS categoria,
    (SELECT SUM(stock) FROM proveedor_articulo WHERE proveedor_articulo.id_articulo = articulo.id) AS stock
    FROM articulo order by precio_venta desc`;

    return res.status(200).json(articulos)

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

    if (cantidad <= 0) {
      return res.status(400).json({
        ok: true,
        msg: 'La cantidad debe ser mayor a 0'
      })
    }

    const relacionExist = await prisma.$queryRaw `
      SELECT * FROM proveedor_articulo WHERE id_articulo = ${id_articulo} AND id_proveedor = ${id_proveedor}  
    `
    if (relacionExist.length > 0) {
      const stock = relacionExist.stock + cantidad;

      await prisma.$queryRaw `
      UPDATE proveedor_articulo SET stock = ${stock}
      WHERE id_articulo = ${id_articulo} AND id_proveedor = ${id_proveedor}
    `
    } else {
      const stock = cantidad;
      await prisma.$queryRaw `
      INSERT INTO proveedor_articulo (id_articulo,id_proveedor,stock)
      VALUES (${id_articulo},${id_proveedor},${stock})
      `
    }

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

const getArticulosByIdProveedor = async (req, res = response) => {
  const {
    id_proveedor
  } = req.params;

  try { 
    const articulos = await prisma.$queryRaw `
    SELECT id,descripcion,referencia,precio_coste,precio_venta,id_categoria,stock,
    (SELECT nombre FROM categoria WHERE a.id_categoria = categoria.id) AS categoria
    FROM articulo as a , proveedor_articulo as pa
    WHERE a.id = pa.id_articulo AND pa.id_proveedor = ${id_proveedor}
    `

    return res.status(200).json(articulos)
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}

const contarArticulos = async (req, res = response) => {
  try{
    //contar cantidad de cada articulo usado en una reparacion
    const articulos = await prisma.$queryRaw `
    select count(*) as count,id_articulo,descripcion,precio_venta from articulo_reparacion inner join articulo a on a.id=articulo_reparacion.id_articulo group by id_articulo order by count desc `;

    return res.status(200).json(articulos)
  }catch(error){
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
  articuloExist,
  getArticulosByIdProveedor,
  contarArticulos
}