export interface Dispositivo {
  id?:                number;
  tipo:              string;
  marca:             string;
  modelo:            string;
  id_cliente?:        number;
  codigo_desbloqueo?: number;
  pin_sim?:           number;
  numero_serie:      string;
  fecha_ultima_reparacion?:      Date;
}
