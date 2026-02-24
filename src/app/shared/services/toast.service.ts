import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ToastComponent, ToastData } from '../components/toast/toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private snackBar = inject(MatSnackBar);

  private defaultConfig: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'end',
    verticalPosition: 'top',
  };

  success(message: string, actionLabel?: string) {
    return this.show(message, 'success', actionLabel);
  }

  error(message: string, actionLabel?: string) {
    return this.show(message, 'error', actionLabel);
  }

  warning(message: string, actionLabel?: string) {
    return this.show(message, 'warning', actionLabel);
  }

  info(message: string, actionLabel?: string) {
    return this.show(message, 'info', actionLabel);
  }

  private show(message: string, type: ToastData['type'], actionLabel?: string) {
    const config: MatSnackBarConfig = {
      ...this.defaultConfig,
      data: { message, type, actionLabel },
      // Panel classes for custom global styling if needed
      panelClass: [`toast-panel-${type}`, 'toast-container'],
    };

    return this.snackBar.openFromComponent(ToastComponent, config);
  }
}
