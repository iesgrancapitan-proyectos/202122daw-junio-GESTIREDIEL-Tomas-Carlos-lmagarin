import { Articulo } from "./articulo.interface";
import { Cliente } from "./cliente.interface";
import { Dispositivo } from "./dispositivo.interface";
import { Tecnico } from "./tecnico.interface";

export interface Reparacion {
  id?:               number;
  estado?:           string;
  accesorios?:       string;
  fecha_compromiso: Date;
  fecha_creacion?: Date;
  averia:           string;
  observaciones:    string;
  dispositivo?:      Dispositivo;
  cliente?:          Cliente;
  tecnico?:          Tecnico;
  articulos?:        Articulo[];
}