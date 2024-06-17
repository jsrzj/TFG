import { state, style, trigger } from '@angular/animations';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { Component } from '@angular/core';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CdkAccordionModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css',
  /*animations: [
    trigger("smoothCollapse", [
      state("initial", style({
        height: "0",
        overflow: "hidden",
        opacity: "0",
        visibility: "hidden"
      }))
    ])
  ]*/
})
export class AccordionComponent {
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  expandedIndex = 0;
}
