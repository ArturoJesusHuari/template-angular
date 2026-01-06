import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para formatear valores monetarios
 * Formato: 1,234.56 (comas para miles, exactamente 2 decimales)
 * Uso: {{ valor | currency }}
 */
@Pipe({
  name: 'currency',
  standalone: true,
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number | string | null | undefined, showSymbol: boolean = true): string {
    if (value === null || value === undefined || value === '') {
      return showSymbol ? '$0.00' : '0.00';
    }

    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numericValue)) {
      return showSymbol ? '$0.00' : '0.00';
    }

    const formatted = numericValue.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return showSymbol ? `$${formatted}` : formatted;
  }
}
