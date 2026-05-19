export interface Asistencia {
  asistenteId: number;
  fecha: string;
  tipoServicio: string;
  observaciones?: string;
  usuarioCreacion: string;
  estado: boolean;
}