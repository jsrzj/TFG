import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-formulario-login',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './formulario-login.component.html',
  styleUrl: './formulario-login.component.css'
})
export class FormularioLoginComponent {

  constructor(public dialog: MatDialog) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogContentExampleDialog, {
      width: '550px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  styleUrl: 'dialog-content-example-dialog.css',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, ReactiveFormsModule, MatIconModule],
})
export class DialogContentExampleDialog {

  private fb = inject(FormBuilder);
  /*private authService = inject(AuthService);*/
  private router = inject(Router);
  private dialogRef = inject(MatDialogRef<DialogContentExampleDialog>);
  private _snackBar = inject(MatSnackBar);

  private authService = inject(AuthService);

  loginForm = this.fb.group({
    correo: [null, Validators.compose([
      Validators.required, Validators.email, Validators.maxLength(60)])
    ],
    password: [null, Validators.compose([
      Validators.required, Validators.minLength(4), Validators.maxLength(60)])
    ],
  });

  hide = true;

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  async login() {
    if (this.loginForm.valid) {
      await this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          localStorage.setItem("token_peliculas", res.token);
          this.dialogRef.close();
          this.router.navigate(["/browse"]);
          this.openSnackBar("Has iniciado sesión correctamente", "");

        },
        error: (error) => {
          console.error("Error login()", error);
          this.openSnackBar("Correo o contraseña incorrecta", "");
        }
      });
    }
  }

  registro() {
    this.dialogRef.close();
    this.router.navigate(["/registro"]);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['snackbar'],
      verticalPosition: "bottom",
    });
  }

}

