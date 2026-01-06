import { createAction, props } from '@ngrx/store';
import { DashboardStats } from '../domain/dashboard.model';

export const loadDashboardStats = createAction('[Dashboard] Load Stats');

export const loadDashboardStatsSuccess = createAction(
  '[Dashboard] Load Stats Success',
  props<{ stats: DashboardStats }>()
);

export const loadDashboardStatsFailure = createAction(
  '[Dashboard] Load Stats Failure',
  props<{ error: string }>()
);
