import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-extension-panel',
  standalone: true,
  imports: [MatExpansionModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatFormField],
  templateUrl: './extension-panel.component.html',
  styleUrl: './extension-panel.component.css'
})
export class ExtensionPanelComponent {
  panelOpenState = false;
}
