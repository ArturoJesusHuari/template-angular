import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/presentation/dashboard.page').then(
            (m) => m.DashboardPage
          ),
      },
      {
        path: 'components',
        loadComponent: () =>
          import('./features/components-demo/presentation/components-demo.page').then(
            (m) => m.ComponentsDemoPage
          ),
      },
      {
        path: 'forms',
        loadComponent: () =>
          import('./features/forms-demo/presentation/forms-demo.page').then(
            (m) => m.FormsDemoPage
          ),
      },
      {
        path: 'tables',
        loadComponent: () =>
          import('./features/tables-demo/presentation/tables-demo.page').then(
            (m) => m.TablesDemoPage
          ),
      },
      {
        path: 'ui-demo',
        loadComponent: () =>
          import('./features/ui-demo/presentation/ui-demo.page').then(
            (m) => m.UiDemoPage
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
