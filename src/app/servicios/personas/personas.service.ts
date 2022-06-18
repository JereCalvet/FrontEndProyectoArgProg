import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Proyecto } from 'src/app/modelo/Proyecto';
import { Persona } from 'src/app/modelo/Persona';
import { Estudio } from 'src/app/modelo/Estudio';
import { Trabajo } from 'src/app/modelo/Trabajo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PersonasService {
  private readonly apiUrl: string = 'http://localhost:8080/api/v1/persona';

  constructor(private http: HttpClient) {}

  obtenerPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.apiUrl}/all`);
  }

  obtenerPersonaPorId(id: number = 1): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/find/${id}`);
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
      .pipe(map((persona: any) => persona.trabajos));
  }

  actualizarTrabajo(idPersona: number, trabajo: Trabajo): Observable<Trabajo[]> {
    return this.http
      .put<Trabajo>(
        `${this.apiUrl}/update/${idPersona}/trabajos/${trabajo.id}`,
        trabajo,
        httpOptions
      )
      .pipe(map((persona: any) => persona.trabajos));
  }

  borrarTrabajo(idPersona: number, idProyecto: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/remove/${idPersona}/trabajos/${idProyecto}`,
      httpOptions
    );
  }
}
