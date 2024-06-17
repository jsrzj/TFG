import { Component, inject } from '@angular/core';
import { HeaderBrowseComponent } from '../../../components/header-browse/header-browse.component';
import { SidenavComponent } from '../../../components/sidenav/sidenav.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { JsonPipe } from '@angular/common';
import { PeliculaService } from '../../../services/pelicula/pelicula.service';
import { IPelicula } from '../../../interfaces/IPelicula';
import { forkJoin, map } from 'rxjs';
import { CarouselComponent } from '../../../components/carousel/carousel.component';
import { SliderPeliculasComponent } from '../../../components/slider-peliculas/slider-peliculas.component';
import { log } from 'node:console';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [HeaderBrowseComponent, SidenavComponent, FooterComponent, JsonPipe, CarouselComponent, SliderPeliculasComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  private peliculaService = inject(PeliculaService);
  peliculas: IPelicula[] = [];
  peliculasEstrenadas: IPelicula[] = [];
  peliculasPopulares: IPelicula[] = [];
  peliculasAccion: IPelicula[] = [];
  peliculasPremiadas: IPelicula[] = [];
  peliculasHollywood: IPelicula[] = [];
  peliculasGenero: IPelicula[] = [];
  sources = [
    this.peliculaService.getPeliculas(),
    this.peliculaService.getPeliculasEstrenadas(),
    this.peliculaService.getPeliculasPopulares(),
    this.peliculaService.getPeliculasGenero("?genero=Acción"),
    this.peliculaService.getPeliculasPremiadas(),
    this.peliculaService.getPeliculasHollywood()
  ]

  ngOnInit(): void {
    forkJoin(this.sources)
      .pipe(
        map(([peliculas, peliculasEstrenadas, peliculasPopulares, peliculasAccion, peliculasPremiadas, peliculasHollywood]) => {
          return {peliculas, peliculasEstrenadas, peliculasPopulares, peliculasAccion, peliculasPremiadas, peliculasHollywood}
        })
      ).subscribe((res: any) => {
        this.peliculas = res.peliculas as IPelicula[];
        this.peliculasEstrenadas = res.peliculasEstrenadas as IPelicula[];
        this.peliculasPopulares = res.peliculasPopulares as IPelicula[];
        this.peliculasAccion = res.peliculasAccion as IPelicula[];
        this.peliculasPremiadas = res.peliculasPremiadas as IPelicula[];
        this.peliculasHollywood = res.peliculasHollywood as IPelicula[];
      })
  }

  getPeliculas() {
    this.peliculaService.getPeliculas().subscribe({
      next: (res: any) => {
        this.peliculas = res;
      },
      error: (error) => {
        console.error("Error fetching getPeliculas()", error);
      }
    });
  }

}
