import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from '../../../shared/components/card/card.component';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

@Component({
  selector: 'app-tables-demo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    CardComponent,
  ],
  template: `
    <div class="tables-container">
      <h1 class="text-3xl font-bold mb-6" style="color: var(--text-primary);">Tablas</h1>

      <app-card title="Tabla con Paginación y Ordenamiento" subtitle="Material Table completa">
        <!-- Filtros -->
        <div class="filters-container mb-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Buscar</mat-label>
              <input matInput [formControl]="searchControl" placeholder="Buscar por nombre o email...">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Filtrar por Rol</mat-label>
              <mat-select [formControl]="roleControl">
                <mat-option value="">Todos</mat-option>
                <mat-option value="Admin">Admin</mat-option>
                <mat-option value="User">User</mat-option>
                <mat-option value="Guest">Guest</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Filtrar por Estado</mat-label>
              <mat-select [formControl]="statusControl">
                <mat-option value="">Todos</mat-option>
                <mat-option value="Activo">Activo</mat-option>
                <mat-option value="Inactivo">Inactivo</mat-option>
              </mat-select>
            </mat-form-field>
          </div>

          <div class="flex justify-end mt-2">
            <button mat-stroked-button (click)="resetFilters()">
              <mat-icon>clear</mat-icon>
              Limpiar Filtros
            </button>
          </div>
        </div>

        <div class="table-wrapper">
          <table mat-table [dataSource]="dataSource" matSort class="w-full">
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> ID </th>
              <td mat-cell *matCellDef="let user"> {{ user.id }} </td>
            </ng-container>

            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Nombre </th>
              <td mat-cell *matCellDef="let user"> {{ user.name }} </td>
            </ng-container>

            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Email </th>
              <td mat-cell *matCellDef="let user"> {{ user.email }} </td>
            </ng-container>

            <ng-container matColumnDef="role">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Rol </th>
              <td mat-cell *matCellDef="let user">
                <span class="badge" [ngClass]="{
                  'badge-purple': user.role === 'Admin',
                  'badge-blue': user.role === 'User',
                  'badge-gray': user.role === 'Guest'
                }">
                  {{ user.role }}
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Estado </th>
              <td mat-cell *matCellDef="let user">
                <span class="badge" [ngClass]="{
                  'badge-green': user.status === 'Activo',
                  'badge-red': user.status === 'Inactivo'
                }">
                  {{ user.status }}
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef> Acciones </th>
              <td mat-cell *matCellDef="let user">
                <button mat-icon-button color="primary">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            
            <!-- Empty state -->
            <tr class="mat-row" *matNoDataRow>
              <td class="mat-cell" [attr.colspan]="displayedColumns.length">
                <div class="empty-state">
                  <mat-icon>search_off</mat-icon>
                  <p>No se encontraron resultados</p>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <mat-paginator 
          [pageSizeOptions]="[5, 10, 20, 50]"
          showFirstLastButtons
          class="mt-4">
        </mat-paginator>
      </app-card>
    </div>
  `,
  styles: [`
    .tables-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .filters-container {
      padding: 1rem;
      background-color: var(--bg-surface);
      border-radius: 8px;
      border: 1px solid var(--border-subtle);
    }

    .table-wrapper {
      overflow-x: auto;
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
    }

    table {
      width: 100%;
    }

    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .badge-purple {
      background-color: rgba(147, 51, 234, 0.2);
      color: #a855f7;
      border: 1px solid rgba(147, 51, 234, 0.3);
    }

    .badge-blue {
      background-color: rgba(59, 130, 246, 0.2);
      color: #60a5fa;
      border: 1px solid rgba(59, 130, 246, 0.3);
    }

    .badge-gray {
      background-color: rgba(156, 163, 175, 0.2);
      color: #9ca3af;
      border: 1px solid rgba(156, 163, 175, 0.3);
    }

    .badge-green {
      background-color: rgba(34, 197, 94, 0.2);
      color: #4ade80;
      border: 1px solid rgba(34, 197, 94, 0.3);
    }

    .badge-red {
      background-color: rgba(239, 68, 68, 0.2);
      color: #f87171;
      border: 1px solid rgba(239, 68, 68, 0.3);
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      color: var(--text-secondary);

      mat-icon {
        font-size: 3rem;
        width: 3rem;
        height: 3rem;
        margin-bottom: 1rem;
        opacity: 0.5;
      }

      p {
        margin: 0;
        font-size: 1rem;
      }
    }
  `],
})
export class TablesDemoPage {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'status', 'actions'];
  dataSource: MatTableDataSource<User>;
  
  searchControl = new FormControl('');
  roleControl = new FormControl('');
  statusControl = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private allUsers: User[] = [];

  constructor() {
    this.allUsers = this.generateMockUsers();
    this.dataSource = new MatTableDataSource(this.allUsers);
    
    // Configurar filtro personalizado
    this.dataSource.filterPredicate = this.createFilter();
    
    // Suscribirse a cambios en los filtros
    this.searchControl.valueChanges.subscribe(() => this.applyFilters());
    this.roleControl.valueChanges.subscribe(() => this.applyFilters());
    this.statusControl.valueChanges.subscribe(() => this.applyFilters());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private createFilter(): (data: User, filter: string) => boolean {
    return (data: User, filter: string): boolean => {
      const searchTerm = this.searchControl.value?.toLowerCase() || '';
      const roleFilter = this.roleControl.value || '';
      const statusFilter = this.statusControl.value || '';

      const matchesSearch = !searchTerm || 
        data.name.toLowerCase().includes(searchTerm) ||
        data.email.toLowerCase().includes(searchTerm);

      const matchesRole = !roleFilter || data.role === roleFilter;
      const matchesStatus = !statusFilter || data.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    };
  }

  private applyFilters() {
    // Trigger filter update
    this.dataSource.filter = Math.random().toString();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  resetFilters() {
    this.searchControl.setValue('');
    this.roleControl.setValue('');
    this.statusControl.setValue('');
  }

  private generateMockUsers(): User[] {
    const roles = ['Admin', 'User', 'Guest'];
    const statuses = ['Activo', 'Inactivo'];
    const users: User[] = [];

    for (let i = 1; i <= 50; i++) {
      users.push({
        id: i,
        name: `Usuario ${i}`,
        email: `usuario${i}@ejemplo.com`,
        role: roles[Math.floor(Math.random() * roles.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
      });
    }

    return users;
  }
}
