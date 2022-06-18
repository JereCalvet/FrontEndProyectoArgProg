import { Estudio } from './Estudio';
import { Habilidad } from './Habilidad';
import { Proyecto } from './Proyecto';
import { Trabajo } from './Trabajo';

export interface Persona {
  id: number;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  nacionalidad: string;
  email: string;
  descripcion: string;
  imagen: string;
  ocupacion: string;
  estudios: Estudio[];
  habilidades: Habilidad[];
  experienciasLaborales: Trabajo[];
  proyectos: Proyecto[];
}
