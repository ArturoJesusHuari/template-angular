import { inject } from '@angular/core';
import { Observable } from 'rxjs';

// ─── Entidad ────────────────────────────────────────────────────────────────
export interface DashboardStats {
  totalUsers: number;
  totalSales: number;
  activeProjects: number;
  revenue: number;
}

// ─── Contrato del repositorio ────────────────────────────────────────────────
export abstract class DashboardRepository {
  abstract getStats(): Observable<DashboardStats>;
}

// ─── Caso de uso ─────────────────────────────────────────────────────────────
export class GetDashboardStats {
  private readonly repo = inject(DashboardRepository);

  execute(): Observable<DashboardStats> {
    return this.repo.getStats();
  }
}
