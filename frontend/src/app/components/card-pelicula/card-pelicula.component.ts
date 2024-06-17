import { AfterViewInit, Component, Inject, Input, OnInit, inject } from '@angular/core';
import { IPelicula } from '../../interfaces/IPelicula';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PeliculaService } from '../../services/pelicula/pelicula.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-pelicula',
  standalone: true,
  imports: [],
  templateUrl: './card-pelicula.component.html',
  styleUrl: './card-pelicula.component.css'
})
export class CardPeliculaComponent {

  //@Input() pelicula: IPelicula | undefined;
  //private router = inject(Router);
  @Input() pelicula!: IPelicula;

  constructor(public dialog: MatDialog) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, peliculaId: string): void {
    //this.router.navigate([`browse/peliculas/${peliculaId}`])
    this.dialog.open(DialogContentExampleDialog, {
      width: '600px',
      height: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { peliculaId: peliculaId }
    });
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatTooltipModule, RouterLink],
  templateUrl: "dialog-content-example-dialog.html",
  styleUrl: 'dialog-content-example-dialog.css',
})
export class DialogContentExampleDialog implements AfterViewInit {

  private router = inject(Router);
  private peliculaService = inject(PeliculaService);
  pelicula!: IPelicula;
  private dialogRef = inject(MatDialogRef<DialogContentExampleDialog>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: {peliculaId: string}) {}

  ngAfterViewInit(): void {
    this.getPeliculaById(this.data.peliculaId);
  }

  getPeliculaById(peliculaId: string) {
    this.peliculaService.getPeliculaById(peliculaId).subscribe({
      next: (res: any) => {
        this.pelicula = res;
      },
      error: (error) => {
        console.error("Error fetching getPeliculaById()", error);
        //this.router.navigate(['/**']);
      }
    });
  }

  watch(peliculaId: string) {
    this.dialogRef.close()
    this.router.navigate([`watch/${peliculaId}`]);
  }

}
