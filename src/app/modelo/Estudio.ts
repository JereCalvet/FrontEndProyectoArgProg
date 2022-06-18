import { ProgresoEstudio } from './progreso-estudio';

export interface Estudio {
  id: number;
  institucion: string;
  titulo: string;
  lugar: string;
  estado: ProgresoEstudio;
}
