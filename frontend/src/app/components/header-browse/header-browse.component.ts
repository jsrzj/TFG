import { Component, HostListener, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavToggleService } from '../../services/sidenav-toggle/sidenav-toggle.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {MatBadgeModule} from '@angular/material/badge';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { PeliculaService } from '../../services/pelicula/pelicula.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header-browse',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule, RouterLink, MatBadgeModule, FormsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule],
  templateUrl: './header-browse.component.html',
  styleUrl: './header-browse.component.css'
})
export class HeaderBrowseComponent {

  private breakpointObserver = inject(BreakpointObserver);
  public isScrolled = false;
  private peliculaService = inject(PeliculaService);
  public authService = inject(AuthService);
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  constructor(private sidenavToggleService: SidenavToggleService) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  toggleSidenav() {
    this.sidenavToggleService.toggleSidenav();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 5;
  }

  onSearch(query: string) {
    if (query.length >= 1) {
      this.router.navigate(["browse/search"], {queryParams: {q: query}});
    }
    else if (query.length === 0) {
      //this.router.navigate(["browse/search"]);
    }
  }

  logout() {
     //this.authService.logout();
    localStorage.removeItem("token_peliculas");
    this.router.navigate(["/"]);
    this.openSnackBar("Se ha cerrado la sesión", "");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: 'snackbar-exito-logout',
      verticalPosition: "bottom",
    });
  }

}
