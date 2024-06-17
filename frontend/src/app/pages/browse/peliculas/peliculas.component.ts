import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { HeaderBrowseComponent } from '../../../components/header-browse/header-browse.component';
import { SidenavComponent } from '../../../components/sidenav/sidenav.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { DashboardComponent } from '../../../components/dashboard/dashboard.component';
import { CarouselComponent } from '../../../components/carousel/carousel.component';
import { PeliculaService } from '../../../services/pelicula/pelicula.service';
import { IPelicula } from '../../../interfaces/IPelicula';
import { BannerComponent } from '../../../components/banner/banner.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatGridListModule} from '@angular/material/grid-list';
import { CardPeliculaComponent } from '../../../components/card-pelicula/card-pelicula.component';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [HeaderBrowseComponent, SidenavComponent, DashboardComponent, FooterComponent, CarouselComponent, BannerComponent, MatChipsModule, MatGridListModule, CardPeliculaComponent],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})
export class PeliculasComponent implements OnInit {

  private peliculaService = inject(PeliculaService);
  peliculas: IPelicula[] = [];
  generos: string[] = ['Acción', 'Comedia', 'Crimen', 'Bélico', 'Suspenso', 'Ciencia ficción', 'Drama', 'Documental', 'Romance', 'Animación', 'Terror', 'Deportes'];

  ngOnInit(): void {
    this.peliculaService.getPeliculas().subscribe({
      next: (res: any) => {
        this.peliculas = res;
        console.log(this.peliculas);
      }
    })


  }

  getPeliculasGenero(genero: string) {
    this.peliculaService.getPeliculasGenero(`?genero=${genero}`).subscribe({
      next: (res: any) => {
        this.peliculas = res;
      }
    })
  }

  saludo() {
    console.log("Hola Jaime me acabo de iniciar!");
  }


}
