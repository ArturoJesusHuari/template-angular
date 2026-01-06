import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CurrencyPipe } from '../../../shared/pipes/currency.pipe';
import { DashboardStats } from '../domain/dashboard.model';
import * as DashboardActions from '../data/dashboard.actions';
import * as DashboardSelectors from '../data/dashboard.selectors';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CardComponent,
    CurrencyPipe,
  ],
  template: `
    <div class="dashboard-container">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
        <button mat-raised-button color="primary" (click)="refreshStats()">
          <mat-icon>refresh</mat-icon>
          Actualizar
        </button>
      </div>

      @if (loading$ | async) {
        <div class="flex justify-center items-center h-64">
          <mat-spinner></mat-spinner>
        </div>
      } @else if (error$ | async; as error) {
        <mat-card class="error-card">
          <mat-card-content>
            <p class="text-red-600">Error: {{ error }}</p>
          </mat-card-content>
        </mat-card>
      } @else if (stats$ | async; as stats) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <app-card title="Total Usuarios" [hasActions]="false">
            <div class="stat-content">
              <mat-icon class="stat-icon text-blue-500">people</mat-icon>
              <p class="stat-value">{{ stats.totalUsers | number }}</p>
            </div>
          </app-card>

          <app-card title="Ventas Totales" [hasActions]="false">
            <div class="stat-content">
              <mat-icon class="stat-icon text-green-500">shopping_cart</mat-icon>
              <p class="stat-value">{{ stats.totalSales | number }}</p>
            </div>
          </app-card>

          <app-card title="Proyectos Activos" [hasActions]="false">
            <div class="stat-content">
              <mat-icon class="stat-icon text-purple-500">work</mat-icon>
              <p class="stat-value">{{ stats.activeProjects }}</p>
            </div>
          </app-card>

          <app-card title="Ingresos" [hasActions]="false">
            <div class="stat-content">
              <mat-icon class="stat-icon text-yellow-600">attach_money</mat-icon>
              <p class="stat-value">{{ stats.revenue | currency }}</p>
            </div>
          </app-card>
        </div>

        <div class="mt-8">
          <app-card title="Acciones Rápidas" subtitle="Operaciones comunes" [hasActions]="true">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button mat-raised-button color="primary" class="w-full">
                <mat-icon>add</mat-icon>
                Nuevo Proyecto
              </button>
              <button mat-raised-button color="accent" class="w-full">
                <mat-icon>person_add</mat-icon>
                Agregar Usuario
              </button>
              <button mat-raised-button class="w-full">
                <mat-icon>assessment</mat-icon>
                Ver Reportes
              </button>
            </div>
          </app-card>
        </div>
      }
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .stat-content {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .stat-icon {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: bold;
      color: var(--text-primary);
    }

    .error-card {
      background-color: #fee2e2;
    }
  `],
})
export class DashboardPage implements OnInit {
  stats$: Observable<DashboardStats | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.stats$ = this.store.select(DashboardSelectors.selectDashboardStats);
    this.loading$ = this.store.select(DashboardSelectors.selectDashboardLoading);
    this.error$ = this.store.select(DashboardSelectors.selectDashboardError);
  }

  ngOnInit() {
    this.refreshStats();
  }

  refreshStats() {
    this.store.dispatch(DashboardActions.loadDashboardStats());
  }
}
