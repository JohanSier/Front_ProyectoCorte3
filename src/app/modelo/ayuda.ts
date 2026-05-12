export interface Ayuda {
  tipo: 'DINERO' | 'EN_ESPECIE';
  idColaborador: number;
  nombreColaborador: string;
  descripcion: string;
  valor?: number;
  cantidad?: number;
  fechaRegistro: string;
}
