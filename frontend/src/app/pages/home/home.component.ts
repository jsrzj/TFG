import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ExtensionPanelComponent } from '../../components/extension-panel/extension-panel.component';
import { AccordionComponent } from '../../components/accordion/accordion.component';
import { SliderHomeComponent } from '../../components/slider-home/slider-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ExtensionPanelComponent, FooterComponent, AccordionComponent, SliderHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
