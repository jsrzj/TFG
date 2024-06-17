import { Component, inject } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { HeaderBrowseComponent } from '../../components/header-browse/header-browse.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { FormularioCrearComponent } from '../../components/formulario-crear/formulario-crear.component';
import { FormularioEditarComponent } from '../../components/formulario-editar/formulario-editar.component';
import { FormularioEliminarComponent } from '../../components/formulario-eliminar/formulario-eliminar.component';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormularioComponent } from '../../components/formulario/formulario.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    HeaderBrowseComponent,
    SidenavComponent,
    MatTabsModule,
    FormularioCrearComponent,
    FormularioEditarComponent,
    FormularioEliminarComponent,
    MatIconModule,
    FooterComponent,
    FormularioComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
