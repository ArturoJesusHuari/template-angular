import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent, ButtonComponent, BadgeComponent } from '../../../shared/components';
import { CurrencyPipe } from '../../../shared/pipes/currency.pipe';
import { DashboardService } from './dashboard.service';
import { GetDashboardStats } from '../domain/dashboard.domain';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    CardComponent,
    ButtonComponent,
    BadgeComponent,
    CurrencyPipe,
  ],
  templateUrl: './dashboard.page.html',
  providers: [DashboardService, GetDashboardStats],
})
export class DashboardPage implements OnInit {
  protected readonly vm = inject(DashboardService);

  ngOnInit(): void {
    this.vm.load();
  }
}
