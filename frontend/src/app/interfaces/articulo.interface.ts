
export interface Articulo {
  cantidad?: number;
  id?:           number;
  descripcion:  string;
  referencia?:   string;
  precio_coste?: number;
  precio_venta: number;
  id_categoria: number;
  categoria?:    string;
  stock?:        number;
  id_proveedor?:  number;
}
