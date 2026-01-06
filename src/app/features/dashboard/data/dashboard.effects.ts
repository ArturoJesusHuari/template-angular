import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as DashboardActions from './dashboard.actions';
import { DashboardRepository } from './dashboard.repository';

@Injectable()
export class DashboardEffects {
  private actions$ = inject(Actions);
  private repository = inject(DashboardRepository);

  loadStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadDashboardStats),
      switchMap(() =>
        this.repository.getStats().pipe(
          map((stats) => DashboardActions.loadDashboardStatsSuccess({ stats })),
          catchError((error) =>
            of(DashboardActions.loadDashboardStatsFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
