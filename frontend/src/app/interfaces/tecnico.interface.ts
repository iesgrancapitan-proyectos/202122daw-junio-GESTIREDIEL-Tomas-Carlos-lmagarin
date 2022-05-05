export interface Tecnico {
  password?: string;
  id_usuario:   string;
  username:     string;
  email:        string;
  nombre:       string;
  registered:   Date;
  last_login?:   Date;
  reparaciones: number;
}
