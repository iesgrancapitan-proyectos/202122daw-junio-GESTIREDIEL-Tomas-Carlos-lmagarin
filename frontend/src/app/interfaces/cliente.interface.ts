export interface Cliente {
  id_usuario?:       string;
  password?:         string;
  rol?:              string;
  username?:         string;
  email:            string;
  nif:              string;
  nombre_fiscal:    string;
  domicilio:        string;
  CP:               string;
  poblacion:        string;
  provincia:        string;
  persona_contacto?: string;
  registered?:       Date;
  telefono?:         Number;
}
