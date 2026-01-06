import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

/**
 * Adaptador de fechas personalizado para formato dd/MM/yyyy
 * Configuración global para toda la aplicación
 */
@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  override parse(value: string): Date | null {
    if (!value) {
      return null;
    }

    // Formato esperado: dd/MM/yyyy
    const parts = value.trim().split('/');
    
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Meses en JS son 0-indexed
      const year = parseInt(parts[2], 10);

      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        const date = new Date(year, month, day);
        
        // Validar que la fecha sea válida
        if (
          date.getFullYear() === year &&
          date.getMonth() === month &&
          date.getDate() === day
        ) {
          return date;
        }
      }
    }

    return null;
  }

  override format(date: Date, displayFormat: Object): string {
    if (!date) {
      return '';
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  override getFirstDayOfWeek(): number {
    return 1; // Lunes como primer día de la semana
  }
}
