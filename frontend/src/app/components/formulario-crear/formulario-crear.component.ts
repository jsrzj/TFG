import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormularioComponent } from '../formulario/formulario.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HeaderBrowseComponent } from '../header-browse/header-browse.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { PeliculaService } from '../../services/pelicula/pelicula.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formulario-crear',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    HeaderBrowseComponent,
    SidenavComponent,
    FormularioComponent,
    MatSelectModule,
    MatTabsModule
  ],
  templateUrl: './formulario-crear.component.html',
  styleUrl: './formulario-crear.component.css'
})
export class FormularioCrearComponent {

  private fb = inject(FormBuilder);
  private peliculaService = inject(PeliculaService);
  posterSeleccionado!: File;
  escenaSeleccionada!: File;
  videoSeleccionado!: File;
  private _snackBar = inject(MatSnackBar);

  peliculaForm = this.fb.group({
    titulo: [null, Validators.required],
    anyo: [null, Validators.required],
    duracion: [null, Validators.required],
    descripcion: [null, Validators.required],
    genero: [null, Validators.required],
    poster: [null, Validators.required],
    escena: [null, Validators.required],
    video: [null, Validators.required],
    estreno: [false, Validators.required],
    popular: [false, Validators.required],
    premiada: [false, Validators.required],
    hollywood: [false, Validators.required],
  });

  generos = [
    {name: 'Acción'},
    {name: 'Comedia'},
    {name: 'Crimen'},
    {name: 'Bélico'},
    {name: 'Suspenso'},
    {name: 'Ciencia ficción'},
    {name: 'Drama'},
    {name: 'Documental'},
    {name: 'Romance'},
    {name: 'Amimación'},
    {name: 'Terror'},
    {name: 'Deportes'}
  ];

  onPosterSeleccionado(event: any) {
    this.posterSeleccionado = event.target.files[0];
  }

  onEscenaSeleccionada(event: any) {
    this.escenaSeleccionada = event.target.files[0];
  }

  onVideoSeleccionado(event: any) {
    this.videoSeleccionado = event.target.files[0];
  }

  async crearPelicula() {
    if (this.peliculaForm.valid) {
      const formData = new FormData();
      formData.append("titulo", this.peliculaForm.value.titulo ?? "")
      formData.append("anyo", this.peliculaForm.value.anyo ?? "")
      formData.append("duracion", this.peliculaForm.value.duracion ?? "")
      formData.append("descripcion", this.peliculaForm.value.descripcion ?? "")
      formData.append("genero", this.peliculaForm.value.genero ?? "")

      formData.append("poster", this.posterSeleccionado)
      formData.append("escena", this.escenaSeleccionada)
      formData.append("video", this.videoSeleccionado)

      formData.append("estreno", this.peliculaForm.value.estreno ? 'true' : 'false');
      formData.append("popular", this.peliculaForm.value.popular ? 'true' : 'false');
      formData.append("premiada", this.peliculaForm.value.premiada ? 'true' : 'false');
      formData.append("hollywood", this.peliculaForm.value.hollywood ? 'true' : 'false');

      /*formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });*/

       await this.peliculaService.createPelicula(formData).subscribe({
        next: (res: any) => {
          this._snackBar.open("Película añadida con éxito.", "", {
            duration: 2000,
            panelClass: "snackbar-exito-pelicula"
          });
          this.peliculaForm.reset();
        },
        error: (error) => {
          console.error("Error crearPelicula()", error);
        }
      });
    }
  }

}
