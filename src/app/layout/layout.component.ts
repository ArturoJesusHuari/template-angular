import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
  ],
  template: `
    <mat-sidenav-container class="layout-container">
      <mat-sidenav mode="side" opened class="sidenav">
        <app-sidebar />
      </mat-sidenav>

      <mat-sidenav-content class="content-wrapper">
        <app-header />
        
        <main class="main-content">
          <router-outlet />
        </main>
        
        <app-footer />
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .layout-container {
      height: 100vh;
      background-color: var(--bg-primary);
    }

    .sidenav {
      width: 260px;
      border-right: 1px solid var(--border-subtle);
      background-color: var(--bg-surface);
    }

    .content-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
      background-color: var(--bg-primary);
    }

    .main-content {
      flex: 1;
      padding: 2rem;
      background-color: var(--bg-primary);
      overflow-y: auto;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .main-content {
        padding: 1rem;
      }
    }
  `],
})
export class LayoutComponent {}
