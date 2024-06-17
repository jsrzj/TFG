import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { IPelicula } from '../../interfaces/IPelicula';
register();

@Component({
  selector: 'app-slider-peliculas',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './slider-peliculas.component.html',
  styleUrl: './slider-peliculas.component.css'
})
export class SliderPeliculasComponent {

  @Input() peliculas: IPelicula[] = [];

  breakpoints = {
    100: {
      coverflowEffect: {
        stretch: 0,
      },
    },
    1024: {
      coverflowEffect: {
        stretch: 1000
      },
    },
  };

}
