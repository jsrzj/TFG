import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PeliculaService } from '../../services/pelicula/pelicula.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formulario-eliminar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './formulario-eliminar.component.html',
  styleUrl: './formulario-eliminar.component.css'
})
export class FormularioEliminarComponent {

  private fb = inject(FormBuilder);
  private peliculaService = inject(PeliculaService);
  private _snackBar = inject(MatSnackBar);

  peliculaForm = this.fb.group({
    id: [null, Validators.required],
  });

  async eliminarPelicula() {
    if (this.peliculaForm.valid) {
      const peliculaId = this.peliculaForm.value.id ?? ""
      await this.peliculaService.eliminarPelicula(peliculaId).subscribe({
        next: (res: any) => {
          this._snackBar.open("Película eliminada con éxito.", "", {
            duration: 2000,
            panelClass: "snackbar-exito-pelicula"
          });
          this.peliculaForm.reset();
        }
      })
    }
  }

}
