import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { InicioComponent } from './pages/browse/inicio/inicio.component';
import { PeliculasComponent } from './pages/browse/peliculas/peliculas.component';
import { SeriesComponent } from './pages/browse/series/series.component';
import { SearchComponent } from './pages/browse/search/search.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { loginGuard } from './guards/login.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { adminGuard } from './guards/admin.guard';
import { WatchComponent } from './pages/watch/watch.component';
import { AccountComponent } from './pages/account/account.component';
import { PruebaComponent } from './pages/prueba/prueba.component';

export const routes: Routes = [
  {
    path: "prueba",
    component: PruebaComponent
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "home",
    redirectTo: ""
  },
  {
    path: "registro",
    component: RegistroComponent
  },
  {
    path: "browse",
    title: "Inicio",
    children: [
      { path: "", component: InicioComponent },
      { path: "peliculas", title: "Peliculas", component: PeliculasComponent, canActivate: [loginGuard] },
      /*{ path: "peliculas/:peliculaId", title: "Peliculas", component: PeliculasComponent, canActivate: [loginGuard] },*/
      { path: "series", title: "Series", component: SeriesComponent, canActivate: [loginGuard] },
      { path: "search", title: "Peliculas", component: SearchComponent, canActivate: [loginGuard] },
    ],
    canActivate: [loginGuard]
  },
  {
    path: "watch/:peliculaId",
    component: WatchComponent,
    canActivate: [loginGuard]
  },
  {
    path: "account",
    component: AccountComponent,
    canActivate: [loginGuard]
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [loginGuard, adminGuard]
  },
  {
    path: "**",
    //pathMatch: "full",
    component: NotFoundComponent,
  },
];
