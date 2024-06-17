import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
register();

@Component({
  selector: 'app-slider-home',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './slider-home.component.html',
  styleUrl: './slider-home.component.css'
})
export class SliderHomeComponent {

  breakpoints = {
    100: {
      slidesPerView: 1,
      //direction: "vertical"
    },
    1024: {
      slidesPerView: 3,
      //direction: "horizontal"
    }
  };

}
