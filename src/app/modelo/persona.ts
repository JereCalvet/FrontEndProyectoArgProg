import { Estudio } from './Estudio';
import { Habilidad } from './Habilidad';
import { Nacionalidad } from './nacionalidad';
import { Proyecto } from './Proyecto';
import { Trabajo } from './Trabajo';
import { Usuario } from './usuario';

export interface Persona {
  id: number;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  nacionalidad: Nacionalidad;
  email: string;
  descripcion: string;
  imagen: string;
  ocupacion: string;
  usuario: Usuario;
  estudios: Estudio[];
  habilidades: Habilidad[];
  experienciasLaborales: Trabajo[];
  proyectos: Proyecto[];
}
