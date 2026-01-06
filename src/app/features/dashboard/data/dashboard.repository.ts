import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { DashboardStats } from '../domain/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardRepository {
  getStats(): Observable<DashboardStats> {
    // Simulación de llamada API
    const mockStats: DashboardStats = {
      totalUsers: 1250,
      totalSales: 3420,
      activeProjects: 28,
      revenue: 125000,
    };

    return of(mockStats).pipe(delay(800));
  }
}
