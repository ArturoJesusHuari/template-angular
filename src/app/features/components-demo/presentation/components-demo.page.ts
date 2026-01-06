import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-example-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Ejemplo de Dialog</h2>
    <mat-dialog-content>
      <p>Este es un ejemplo de Material Dialog.</p>
      <p>Puedes agregar cualquier contenido aquí.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="primary" mat-dialog-close>Aceptar</button>
    </mat-dialog-actions>
  `,
})
export class ExampleDialogComponent {}

@Component({
  selector: 'app-components-demo',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTooltipModule,
    CardComponent,
  ],
  template: `
    <div class="components-container">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Componentes Material</h1>

      <app-card title="Botones" subtitle="Diferentes variantes de botones">
        <div class="flex flex-wrap gap-4">
          <button mat-raised-button>Basic</button>
          <button mat-raised-button color="primary">Primary</button>
          <button mat-raised-button color="accent">Accent</button>
          <button mat-raised-button color="warn">Warn</button>
          <button mat-raised-button disabled>Disabled</button>
        </div>
        
        <div class="flex flex-wrap gap-4 mt-4">
          <button mat-flat-button color="primary">Flat Button</button>
          <button mat-stroked-button color="primary">Stroked Button</button>
          <button mat-icon-button color="primary">
            <mat-icon>favorite</mat-icon>
          </button>
          <button mat-fab color="primary">
            <mat-icon>add</mat-icon>
          </button>
          <button mat-mini-fab color="accent">
            <mat-icon>edit</mat-icon>
          </button>
        </div>
      </app-card>

      <app-card title="Dialog" subtitle="Abre un modal dialog">
        <button mat-raised-button color="primary" (click)="openDialog()">
          <mat-icon>open_in_new</mat-icon>
          Abrir Dialog
        </button>
      </app-card>

      <app-card title="Snackbar" subtitle="Notificaciones temporales">
        <div class="flex gap-4">
          <button mat-raised-button (click)="showSnackbar('Snackbar básico')">
            Snackbar Simple
          </button>
          <button mat-raised-button color="primary" (click)="showSnackbar('¡Operación exitosa!', 'success')">
            Snackbar Success
          </button>
          <button mat-raised-button color="warn" (click)="showSnackbar('¡Error!', 'error')">
            Snackbar Error
          </button>
        </div>
      </app-card>

      <app-card title="Menu" subtitle="Menús desplegables">
        <button mat-raised-button [matMenuTriggerFor]="menu">
          <mat-icon>menu</mat-icon>
          Abrir Menú
        </button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item>
            <mat-icon>dialpad</mat-icon>
            <span>Opción 1</span>
          </button>
          <button mat-menu-item>
            <mat-icon>voicemail</mat-icon>
            <span>Opción 2</span>
          </button>
          <button mat-menu-item disabled>
            <mat-icon>notifications_off</mat-icon>
            <span>Opción Deshabilitada</span>
          </button>
        </mat-menu>
      </app-card>

      <app-card title="Tooltip" subtitle="Información al pasar el mouse">
        <div class="flex gap-4">
          <button mat-raised-button matTooltip="Tooltip básico">
            Hover me
          </button>
          <button mat-raised-button matTooltip="Tooltip arriba" matTooltipPosition="above">
            Tooltip Arriba
          </button>
          <button mat-raised-button matTooltip="Tooltip derecha" matTooltipPosition="right">
            Tooltip Derecha
          </button>
        </div>
      </app-card>
    </div>
  `,
  styles: [`
    .components-container {
      max-width: 1200px;
      margin: 0 auto;
    }
  `],
})
export class ComponentsDemoPage {
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  openDialog() {
    this.dialog.open(ExampleDialogComponent);
  }

  showSnackbar(message: string, type: string = 'default') {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'snackbar-success' : type === 'error' ? 'snackbar-error' : '',
    });
  }
}
