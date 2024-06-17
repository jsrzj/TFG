import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IPelicula } from '../../interfaces/IPelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private http = inject(HttpClient);
  private apiURL = environment.apiURL;

  constructor() { }

  //Crear
  createPelicula(formData: any) {
    return this.http.post<any>(`${this.apiURL}/peliculas/create`, formData, this.createHeaders());
  }

  //Obtener
  /*public getPeliculas(): Observable<IPelicula> {
    return this.http.get<IPelicula>(`${this.apiURL}/peliculas`);
  }*/

  getPeliculas() {
    return this.http.get<any>(`${this.apiURL}/peliculas`, this.createHeaders());
  }

  getPeliculasEstrenadas() {
    return this.http.get<any>(`${this.apiURL}/peliculas/estrenadas`, this.createHeaders());
  }

  getPeliculasPopulares() {
    return this.http.get<any>(`${this.apiURL}/peliculas/populares`, this.createHeaders());
  }

  getPeliculasGenero(peliculaGenero: string) {
    return this.http.get<any>(`${this.apiURL}/peliculas/genero${peliculaGenero}`, this.createHeaders());
  }

  getPeliculasPremiadas() {
    return this.http.get<any>(`${this.apiURL}/peliculas/premiadas`, this.createHeaders());
  }

  getPeliculasHollywood() {
    return this.http.get<any>(`${this.apiURL}/peliculas/hollywood`, this.createHeaders());
  }

  getPeliculasSearch(query: string) {
    return this.http.get<any>(`${this.apiURL}/peliculas/search?q=${query}`, this.createHeaders());
  }

  getPeliculaById(peliculaId: string) {
    return this.http.get<any>(`${this.apiURL}/peliculas/${peliculaId}`, this.createHeaders());
  }

  //Editar
  editarPelicula(peliculaId: string, formData: any) {
    return this.http.put<any>(`${this.apiURL}/peliculas/put/${peliculaId}`, formData, this.createHeaders());
  }

  //Eliminar
  eliminarPelicula(peliculaId: string) {
    return this.http.delete<any>(`${this.apiURL}/peliculas/delete/${peliculaId}`, this.createHeaders());
  }

  //Headers
  createHeaders() {
    return {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem("token_peliculas")!
      })
    }
  }

}
