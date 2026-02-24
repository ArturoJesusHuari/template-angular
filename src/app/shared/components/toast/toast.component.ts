import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

export interface ToastData {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'default';
  actionLabel?: string;
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="flex items-start gap-2">
      <!-- Icon Wrapper -->
      <div
        [class]="getIconContainerClasses()"
        class="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl relative overflow-hidden group"
      >
        <!-- Glow Light Effect -->
        <div class="absolute inset-0 opacity-15 bg-current"></div>
        <!-- Icon - Perfect centering -->
        <mat-icon
          class="!flex !items-center !justify-center !m-0 !p-0 !text-[22px] !w-6 !h-6 !leading-none"
          >{{ getIcon() }}</mat-icon
        >
      </div>

      <!-- Text Content -->
      <div class="flex-1 flex flex-col gap-0.5 pt-0.5">
        <span class="text-white text-sm font-bold tracking-tight m-0 leading-tight">
          {{ getTitle() }}
        </span>
        <p class="text-[#a0a0a0] text-[13px] leading-snug m-0 font-medium opacity-90">
          {{ data.message }}
        </p>
      </div>

      <!-- Action / Close Section -->
      <div class="flex-shrink-0 pt-0.5 flex items-center">
        @if (data.actionLabel) {
          <button
            (click)="snackBarRef.dismissWithAction()"
            class="text-[11px] font-bold uppercase tracking-[0.1em] px-3 py-2 rounded-lg hover:bg-white/5 transition-all"
            [class]="getActionClasses()"
          >
            {{ data.actionLabel }}
          </button>
        } @else {
          <button
            (click)="snackBarRef.dismiss()"
            class="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/5 transition-all text-[#707070] hover:text-[#ededed]"
          >
            <mat-icon class="!text-lg !flex !items-center !justify-center !w-5 !h-5 !m-0 !p-0"
              >close</mat-icon
            >
          </button>
        }
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      /* Ensure Material Icons font is used correctly if project uses it */
      mat-icon {
        font-family: 'Material Icons';
      }
    `,
  ],
})
export class ToastComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: ToastData,
    public snackBarRef: MatSnackBarRef<ToastComponent>,
  ) {}

  getIcon(): string {
    switch (this.data.type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info_outline';
      default:
        return 'notifications_none';
    }
  }

  getTitle(): string {
    switch (this.data.type) {
      case 'success':
        return 'Completado';
      case 'error':
        return 'Error del Sistema';
      case 'warning':
        return 'Atención';
      case 'info':
        return 'Información';
      default:
        return 'Mensaje';
    }
  }

  getIconContainerClasses(): string {
    const base = 'transition-all duration-300 group-hover:scale-105';
    switch (this.data.type) {
      case 'success':
        return `${base} text-[#3ecf8e]`;
      case 'error':
        return `${base} text-[#ff5555]`;
      case 'warning':
        return `${base} text-[#ffb86c]`;
      case 'info':
        return `${base} text-[#3b82f6]`;
      default:
        return `${base} text-[#a0a0a0]`;
    }
  }

  getActionClasses(): string {
    switch (this.data.type) {
      case 'success':
        return 'text-[#3ecf8e]';
      case 'error':
        return 'text-[#ff5555]';
      case 'warning':
        return 'text-[#ffb86c]';
      case 'info':
        return 'text-[#3b82f6]';
      default:
        return 'text-white';
    }
  }
}
