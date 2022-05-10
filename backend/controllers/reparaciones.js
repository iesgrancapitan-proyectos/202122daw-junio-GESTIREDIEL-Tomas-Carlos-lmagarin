const {
  response
} = require('express');
const {
  PrismaClient
} = require('@prisma/client')

const prisma = new PrismaClient()

const getAllReparaciones=async(req,res)=> {

  const reparaciones=await prisma.$queryRaw `
    select tipo,marca,modelo,estado,accesorios,codigo_desbloqueo,pin_sim,nombre,descripcion,referencia,precio_coste,precio_venta from reparacion p inner join dispositivo d on p.id_dispositivo=d.id inner join tecnico t on p.id_tecnico=t.id inner join articulo a on p.id_articulo=a.id
  `

  if(reparaciones.length<0){
    return res.status(404).json({
      ok:false
    })
  }

  return res.status(200).json({
    ok:true,
    reparaciones
  })
}

module.exports = {
  getAllReparaciones
}