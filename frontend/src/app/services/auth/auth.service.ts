import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IUsuario } from '../../interfaces/IUsuario';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private apiURL = environment.apiURL;
  private router = inject(Router);

  constructor() { }

  registro(usuario: IUsuario) {
    return this.http.post<any>(`${this.apiURL}/auth/registro`, usuario);
  }

  login(usuario: any) {
    return this.http.post<any>(`${this.apiURL}/auth/login`, usuario);
  }

  logout() {
    localStorage.removeItem("token_pelicuas");
    this.router.navigate(["/"]);
  }

  isAdmin(): boolean {
    const token = localStorage.getItem("token_peliculas")!;

    if (token) {
      const decoded = jwtDecode<any>(token);
      if (decoded && Array.isArray(decoded.rol)) {
        return decoded.rol.includes("admin");
      }
    }

    return false;
  }


}
