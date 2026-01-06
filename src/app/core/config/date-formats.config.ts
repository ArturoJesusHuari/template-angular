import { MAT_DATE_FORMATS } from '@angular/material/core';

/**
 * Formato de fechas global para Angular Material
 * Formato: dd/MM/yyyy
 */
export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

/**
 * Provider para configuración de formato de fechas
 */
export const DATE_FORMAT_PROVIDER = {
  provide: MAT_DATE_FORMATS,
  useValue: CUSTOM_DATE_FORMATS,
};
