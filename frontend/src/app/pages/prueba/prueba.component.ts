import { Component, OnInit, inject } from '@angular/core';
import { PeliculaService } from '../../services/pelicula/pelicula.service';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent implements OnInit {

  peliculaService = inject(PeliculaService);
  pelicula: any;

  ngOnInit(): void {
    this.getPeliculaById();
  }

  getPeliculaById() {
    this.peliculaService.getPeliculaById("66526bdf4228beb71379f31b").subscribe({
      next: (res: any) => {
        this.pelicula = res;

        console.log(this.pelicula);

      }
    })
  }


}
