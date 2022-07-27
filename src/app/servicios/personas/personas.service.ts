import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { Proyecto } from 'src/app/modelo/Proyecto';
import { Persona } from 'src/app/modelo/persona';
import { Estudio } from 'src/app/modelo/Estudio';
import { Trabajo } from 'src/app/modelo/Trabajo';
import { Habilidad } from 'src/app/modelo/Habilidad';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PersonasService {
  private readonly apiUrl: string = `${environment.apiUrl}persona`;

  constructor(private http: HttpClient) {}

  obtenerPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.apiUrl}/all`);
  }

  obtenerPersonaPorId(id: number = 1): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/find/${id}`);
  }

  obtenerPersonaLogeada(): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/current`);
  }

  agregarPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(`${this.apiUrl}/add`, persona, httpOptions);
  }

  actualizarPersonaPorId(idPersona: number, persona: Persona): Observable<Persona> {
    const datosPersona: any = {
      id: idPersona,
      nombres: persona.nombres,
      apellidos: persona.apellidos,
      fechaNacimiento: persona.fechaNacimiento,
      nacionalidad: persona.nacionalidad,
      email: persona.email,
      descripcion: persona.descripcion,
      imagen: persona.imagen,
      ocupacion: persona.ocupacion,
    };
    return this.http.put<Persona>(`${this.apiUrl}/update/${idPersona}`, datosPersona, httpOptions);
  }

  // -----------------------------proyectos-----------------------------

  agregarProyecto(idPersona: number, proyecto: Proyecto): Observable<Proyecto[]> {
    return this.http
      .post<Proyecto>(`${this.apiUrl}/add/${idPersona}/proyectos/`, proyecto, httpOptions)
      .pipe(map((persona: any) => persona.proyectos));
  }

  actualizarProyecto(idPersona: number, proyecto: Proyecto): Observable<Proyecto[]> {
    return this.http
      .put<Proyecto>(
        `${this.apiUrl}/update/${idPersona}/proyectos/${proyecto.id}`,
        proyecto,
        httpOptions
      )
      .pipe(map((persona: any) => persona.proyectos));
  }

  borrarProyecto(idPersona: number, idProyecto: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/remove/${idPersona}/proyectos/${idProyecto}`,
      httpOptions
    );
  }

  // -----------------------------estudios-----------------------------

  agregarEstudio(idPersona: number, estudio: Estudio): Observable<Estudio[]> {
    return this.http
      .post<Estudio>(`${this.apiUrl}/add/${idPersona}/estudios/`, estudio, httpOptions)
      .pipe(map((persona: any) => persona.estudios));
  }

  actualizarEstudio(idPersona: number, estudio: Estudio): Observable<Estudio[]> {
    return this.http
      .put<Estudio>(
        `${this.apiUrl}/update/${idPersona}/estudios/${estudio.id}`,
        estudio,
        httpOptions
      )
      .pipe(map((persona: any) => persona.estudios));
  }

  borrarEstudio(idPersona: number, idProyecto: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/remove/${idPersona}/estudios/${idProyecto}`,
      httpOptions
    );
  }

  // -----------------------------trabajos-----------------------------

  agregarTrabajo(idPersona: number, trabajo: Trabajo): Observable<Trabajo[]> {
    return this.http
      .post<Trabajo>(`${this.apiUrl}/add/${idPersona}/trabajos/`, trabajo, httpOptions)
      .pipe(map((persona: any) => persona.experienciasLaborales));
  }

  actualizarTrabajo(idPersona: number, trabajo: Trabajo): Observable<Trabajo[]> {
    return this.http
      .put<Trabajo>(
        `${this.apiUrl}/update/${idPersona}/trabajos/${trabajo.id}`,
        trabajo,
        httpOptions
      )
      .pipe(map((persona: any) => persona.experienciasLaborales));
  }

  borrarTrabajo(idPersona: number, idProyecto: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/remove/${idPersona}/trabajos/${idProyecto}`,
      httpOptions
    );
  }

  // -----------------------------habilidades-----------------------------

  agregarHabilidad(idPersona: number, habilidad: Habilidad): Observable<Habilidad[]> {
    return this.http
      .post<Habilidad>(`${this.apiUrl}/add/${idPersona}/habilidades/`, habilidad, httpOptions)
      .pipe(map((persona: any) => persona.habilidades));
  }

  actualizarHabilidad(idPersona: number, habilidad: Habilidad): Observable<Habilidad[]> {
    return this.http
      .put<Habilidad>(
        `${this.apiUrl}/update/${idPersona}/habilidades/${habilidad.id}`,
        habilidad,
        httpOptions
      )
      .pipe(map((persona: any) => persona.habilidades));
  }

  borrarHabilidad(idPersona: number, idHabilidad: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/remove/${idPersona}/habilidades/${idHabilidad}`,
      httpOptions
    );
  }
}
