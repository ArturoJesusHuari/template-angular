import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

interface MenuItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule],
  template: `
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="logo-box"></div>
        <h2 class="sidebar-title">ANGULAR CORE</h2>
      </div>
      
      <mat-nav-list class="sidebar-menu">
        @for (item of menuItems; track item.route) {
          <a 
            mat-list-item 
            [routerLink]="item.route"
            routerLinkActive="active"
            class="menu-item"
          >
            <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
            <span matListItemTitle>{{ item.label }}</span>
          </a>
        }
      </mat-nav-list>

      <div class="sidebar-footer">
        v2.4.0 — Enterprise Edition
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      height: 100%;
      background-color: var(--bg-surface);
      display: flex;
      flex-direction: column;
      border-right: 1px solid var(--border-subtle);
    }

    .sidebar-header {
      padding: 2rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .logo-box {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-hover));
      border-radius: 8px;
    }

    .sidebar-title {
      font-size: 1.125rem;
      font-weight: 800;
      color: var(--text-primary);
      letter-spacing: -0.02em;
      margin: 0;
    }

    .sidebar-menu {
      padding: 0 0.75rem;
      flex: 1;
    }

    .menu-item {
      color: var(--text-secondary);
      margin-bottom: 0.25rem;
      border-radius: 8px;
      height: 44px !important;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:hover {
        background-color: var(--bg-surface-hover);
        color: var(--text-primary);
      }
      
      &.active {
        background-color: rgba(61, 197, 127, 0.1);
        color: var(--accent-primary);
        font-weight: 600;
        
        ::ng-deep .mat-mdc-list-item-icon {
          color: var(--accent-primary);
        }
      }
    }

    .sidebar-footer {
      padding: 1.5rem;
      border-top: 1px solid var(--border-subtle);
      font-size: 0.75rem;
      color: var(--text-tertiary);
    }
  `],
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { label: 'Componentes Material', route: '/components', icon: 'widgets' },
    { label: 'Formularios', route: '/forms', icon: 'description' },
    { label: 'Tablas', route: '/tables', icon: 'table_chart' },
    { label: 'UI Demo', route: '/ui-demo', icon: 'palette' },
  ];
}
