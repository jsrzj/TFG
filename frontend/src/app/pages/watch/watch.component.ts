import { Component, Input, OnInit, inject } from '@angular/core';
import { IPelicula } from '../../interfaces/IPelicula';
import { PeliculaService } from '../../services/pelicula/pelicula.service';

@Component({
  selector: 'app-watch',
  standalone: true,
  imports: [],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css'
})
export class WatchComponent implements OnInit {

  @Input("peliculaId") peliculaId!: string
  pelicula!: IPelicula;
  private peliculaService = inject(PeliculaService);

  ngOnInit(): void {
    this.getPeliculaById();
  }

  async getPeliculaById() {
    await this.peliculaService.getPeliculaById(this.peliculaId).subscribe({
      next: (res: any) => {
        this.pelicula = res;
      },
      error: (error) => {
        console.error("Error fetching getPeliculaById()", error);
      }
    });
  }

}
