import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { IPelicula } from '../../interfaces/IPelicula';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CardPeliculaComponent } from '../card-pelicula/card-pelicula.component';
import Swiper from 'swiper';
register();

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CardPeliculaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {

  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;
  @Input() titulo!: string;
  @Input() peliculas: IPelicula[] = [];


  breakpoints = {
    100: {
      slidesPerView: 2,
      slidesPerGroup: 2
    },
    640: {
      slidesPerView: 5,
      slidesPerGroup: 5
    },
    1024: {
      slidesPerView: 7,
    },
  };

  swiper: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['peliculas'] && !changes['peliculas'].firstChange) {
      this.initSwiper();
    }
  }

  private initSwiper() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }

    this.swiper = new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 7,
      slidesPerGroup: 7,
      spaceBetween: 25,
      navigation: true,
      breakpoints: this.breakpoints
    });
  }

}
