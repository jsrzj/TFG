import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { IUsuario } from '../../interfaces/IUsuario';
import { HeaderBrowseComponent } from '../../components/header-browse/header-browse.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { MatIconModule } from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { FooterComponent } from '../../components/footer/footer.component';


@Component({
  selector: 'app-account',
  standalone: true,
  imports: [HeaderBrowseComponent, SidenavComponent, MatIconModule, MatGridListModule, FooterComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {

  usuario: IUsuario = {
    nombre: '',
    apellidos: '',
    correo: '',
    password: ''
  }

  ngOnInit(): void {
    this.decodifyToken();
  }

  decodifyToken(): void {
    const token = localStorage.getItem("token_peliculas")!;

    if (token) {
      const decoded = jwtDecode<any>(token);
      this.usuario.nombre = decoded.nombre;
      this.usuario.apellidos = decoded.apellidos;
      this.usuario.correo = decoded.correo;
    }
  }

}
