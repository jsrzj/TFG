import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PeliculaService } from '../../services/pelicula/pelicula.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HeaderBrowseComponent } from '../header-browse/header-browse.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { FormularioComponent } from '../formulario/formulario.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { IPelicula } from '../../interfaces/IPelicula';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formulario-editar',
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
  templateUrl: './formulario-editar.component.html',
  styleUrl: './formulario-editar.component.css'
})
export class FormularioEditarComponent {

  private fb = inject(FormBuilder);
  private peliculaService = inject(PeliculaService);
  posterSeleccionado!: File;
  escenaSeleccionada!: File;
  videoSeleccionado!: File;
  pelicula!: any;
  private _snackBar = inject(MatSnackBar);

  peliculaForm = this.fb.group({
    id: [null, Validators.required],
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
    {name: 'Animación'},
    {name: 'Terror'},
    {name: 'Deportes'}
  ];

  onIdBlur() {
    const peliculaId = this.peliculaForm.value.id ?? "";

    this.peliculaService.getPeliculaById(peliculaId).subscribe({
      next: (res: any) => {
        this.pelicula = res;
        this.peliculaForm.patchValue({
          titulo: this.pelicula.titulo,
          anyo: this.pelicula.anyo,
          duracion: this.pelicula.duracion,
          descripcion: this.pelicula.descripcion,
          genero: this.pelicula.genero,
          estreno: this.pelicula.estreno,
          popular: this.pelicula.popular,
          premiada: this.pelicula.premiada,
          hollywood: this.pelicula.hollywood,
        });
      },
      error: (error) => {
        console.error("Error fetching getPeliculaById()", error);
      }
    });
  }

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
    //if (this.peliculaForm.valid) {
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

      const peliculaId = this.peliculaForm.value.id ?? ""

       await this.peliculaService.editarPelicula(peliculaId, formData).subscribe({
        next: (res: any) => {
          this._snackBar.open("Película editada con éxito.", "", {
            duration: 2000,
            panelClass: "snackbar-exito-pelicula"
          });
          this.peliculaForm.reset();
        },
        error: (error) => {
          console.error("Error editarPelicula()", error);
        }
      });
    //}
  }

}
