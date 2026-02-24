import { Injectable, inject, signal, computed } from '@angular/core';
import { DashboardStats, GetDashboardStats } from '../../domain/dashboard.domain';

@Injectable()
export class DashboardService {
  private readonly useCase = inject(GetDashboardStats);

  private readonly _stats = signal<DashboardStats | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly stats = computed(() => this._stats());
  readonly loading = computed(() => this._loading());
  readonly error = computed(() => this._error());

  load(): void {
    this._loading.set(true);
    this._error.set(null);

    this.useCase.execute().subscribe({
      next: (stats) => {
        this._stats.set(stats);
        this._loading.set(false);
      },
      error: (err: Error) => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }
}
