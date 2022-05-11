import { Proveedor } from './proveedor.interface';
export interface Articulo {
  id?:           number;
  descripcion:  string;
  referencia?:   string;
  precio_coste?: number;
  precio_venta: number;
  id_categoria: number;
  categoria?:    string;
  stock?:        number;
  proveedores?:  Proveedor[];
}
