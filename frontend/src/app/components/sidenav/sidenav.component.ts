import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SidenavToggleService } from '../../services/sidenav-toggle/sidenav-toggle.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatListModule, MatIconModule, MatToolbarModule, RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

  isSidenavOpen: boolean = false;

  constructor(private sidenavToggleService: SidenavToggleService) { }

  ngOnInit() {
    this.sidenavToggleService.getToggleSubject().subscribe(() => {
      this.isSidenavOpen = !this.isSidenavOpen;
    });
  }

}
