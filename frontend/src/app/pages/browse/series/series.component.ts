import { Component } from '@angular/core';
import { HeaderBrowseComponent } from '../../../components/header-browse/header-browse.component';
import { SidenavComponent } from '../../../components/sidenav/sidenav.component';
import { DashboardComponent } from '../../../components/dashboard/dashboard.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [HeaderBrowseComponent, SidenavComponent, DashboardComponent, FooterComponent],
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent {

}
