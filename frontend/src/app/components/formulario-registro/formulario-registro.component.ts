import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { IUsuario } from '../../interfaces/IUsuario';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar} from '@angular/material/snack-bar';
import { MatCard } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-formulario-registro',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatCard,
    MatGridListModule
  ],
  templateUrl: './formulario-registro.component.html',
  styleUrl: './formulario-registro.component.css'
})
export class FormularioRegistroComponent {

  private router = inject(Router);
  private authService = inject(AuthService);
  private _formBuilder = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar);

  firstFormGroup = this._formBuilder.group({
    correo: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(60)])],
  });

  secondFormGroup = this._formBuilder.group({
    nombre: ['', Validators.compose([Validators.required, Validators.maxLength(60)])],
    apellidos: ['', Validators.compose([Validators.required, Validators.maxLength(60)])]
  });

  thirdFormGroup = this._formBuilder.group({
    password: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(60)])],
    confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(60)])]
  });

  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  gutterSizeValue!: string;
  breakpointObserver = inject(BreakpointObserver);

  constructor() {
    this.breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe(result => {
      if (result.matches) {
        this.gutterSizeValue = '50px';
      } else {
        this.gutterSizeValue = '200px';
      }
    });
  }

  gutterSize(): string {
    return this.gutterSizeValue;
  }

  async registrar() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      if (this.thirdFormGroup.value.password === this.thirdFormGroup.value.confirmPassword)  {
        const usuario: IUsuario = {
          nombre: this.secondFormGroup.value.nombre ?? "",
          apellidos: this.secondFormGroup.value.apellidos ?? "",
          correo: this.firstFormGroup.value.correo ?? "",
          password: this.thirdFormGroup.value.password ?? ""
        };

        await this.authService.registro(usuario).subscribe({
          next: (res: any) => {
            this._snackBar.open("Te has registrado exitosamente", "", {
              duration: 2000,
              panelClass: "snackbar-exito-registro"
            });
            this.router.navigate(["/"]);
          },
          error: (error) => {
            if (error.status === 400) {
              this._snackBar.open("El correo electrónico ya está en uso.", "", {
                duration: 2000,
                panelClass: "snackbar-fallo-registro"
              });
            }
          }
        });
      }
      else {
        this._snackBar.open("Las contraseñas no conciden.", "", {
          duration: 2000,
          panelClass: "snackbar-fallo-registro"
        });
      }
    }
  }

}
