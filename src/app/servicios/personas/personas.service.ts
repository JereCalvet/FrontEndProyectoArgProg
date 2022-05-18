import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Persona } from 'src/app/modelo/persona';

@Injectable({
  providedIn: 'root',
})
export class PersonasService {
  private readonly apiUrl: string = 'http://localhost:8080/api/v1/persona';

  constructor(private http: HttpClient) {}

  obtenerPersonas(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/all`)
      .pipe(map((resp) => this.procesarRespuestaObtenerPersonas(resp)));
  }

  obtenerPersonaPorId(id: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/find/${id}`).pipe(
      map(
        //extraer a un metodo porque necesito los arrays con cosas
        (persona: any) =>
          <Persona>{
            id: persona.id,
            apellido: persona.apellidos,
            nombre: persona.nombres,
            nacionalidad: persona.nacionalidad,
            fechaNacimiento: persona.fechaNacimiento,
            email: persona.email,
            ocupacion: persona.ocupacion,
            descripcion: persona.descripcion,
            foto: persona.imagen,
          }
      )
    );
    // .pipe(
    //   map((respuesta) => this.procesarObtenerPersonasRespuesta(respuesta))
    // );
  }

  /**
   * Mapeo cada persona en la respuesta al modelo de persona que me sirve para mostrar
   */
  private procesarRespuestaObtenerPersonas(personas: any): any {
    return {
      personas: personas.map(
        (persona: any) =>
          <Persona>{
            id: persona.id,
            apellido: persona.apellidos,
            nombre: persona.nombres,
            nacionalidad: persona.nacionalidad,
            fechaNacimiento: persona.fechaNacimiento,
            email: persona.email,
            ocupacion: persona.ocupacion,
            descripcion: persona.descripcion,
            foto: persona.imagen,
          }
      ),
    };
  }
}
