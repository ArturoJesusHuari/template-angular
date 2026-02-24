import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { DashboardStats, DashboardRepository } from '../domain/dashboard.domain';

// ─── DTO (forma cruda de la API) ─────────────────────────────────────────────
interface DashboardStatsDto {
  total_users: number;
  total_sales: number;
  active_projects: number;
  revenue: number;
}

// ─── Mapper ──────────────────────────────────────────────────────────────────
function toDomain(dto: DashboardStatsDto): DashboardStats {
  return {
    totalUsers: dto.total_users,
    totalSales: dto.total_sales,
    activeProjects: dto.active_projects,
    revenue: dto.revenue,
  };
}

// ─── Implementación del repositorio ──────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class DashboardRepositoryImpl extends DashboardRepository {
  override getStats(): Observable<DashboardStats> {
    // Reemplazar con: this.http.get<DashboardStatsDto>('/api/dashboard/stats')
    const mock: DashboardStatsDto = {
      total_users: 1250,
      total_sales: 3420,
      active_projects: 28,
      revenue: 125000,
    };
    return of(mock).pipe(delay(800), map(toDomain));
  }
}
