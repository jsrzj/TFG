import { AfterViewInit, Component, inject } from '@angular/core';
import { HeaderBrowseComponent } from '../../../components/header-browse/header-browse.component';
import { SidenavComponent } from '../../../components/sidenav/sidenav.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PeliculaService } from '../../../services/pelicula/pelicula.service';
import { IPelicula } from '../../../interfaces/IPelicula';
import { FormularioComponent } from '../../../components/formulario/formulario.component';
import { CarouselComponent } from '../../../components/carousel/carousel.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { debounceTime, filter, map } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, HeaderBrowseComponent, SidenavComponent, FooterComponent, FormsModule, FormularioComponent, CarouselComponent, MatGridListModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements AfterViewInit {

  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  peliculaService = inject(PeliculaService);
  peliculasSearch: IPelicula[] = [];
  encontrado: Boolean = true;
  peliculas: IPelicula[] = [];

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      filter(params => params['q']),
      debounceTime(300),
      map(params => params['q'])
    ).subscribe({
      next: (term: string) => {
        this.peliculaService.getPeliculasSearch(term).subscribe({
          next: (res: any) => {
            this.encontrado = true;
            this.peliculasSearch = res;
          },
          error: (error) => {
            this.encontrado = false;
            console.log("Error fetching getPeliculasSearch()", error);
          }
        });
      }
    });
  }

  ngAfterViewInit() {

  }

}
