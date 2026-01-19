import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CardComponent, ButtonComponent, BadgeComponent } from '../../../shared/components';
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
    ButtonComponent,
    BadgeComponent,
    CurrencyPipe,
  ],
  templateUrl: './dashboard.page.html'
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
