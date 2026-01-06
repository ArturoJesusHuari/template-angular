import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validadores personalizados centralizados
 * Para uso en formularios reactivos
 */

/**
 * Validador para números enteros (sin decimales)
 */
export function integerValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const value = control.value.toString();
    const isInteger = /^-?\d+$/.test(value);

    return isInteger ? null : { integer: { value: control.value } };
  };
}

/**
 * Validador para números decimales
 * @param maxDecimals Número máximo de decimales permitidos (default: 2)
 */
export function decimalValidator(maxDecimals: number = 2): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const value = control.value.toString();
    const regex = new RegExp(`^-?\\d+(\\.\\d{1,${maxDecimals}})?$`);
    const isValid = regex.test(value);

    return isValid ? null : { decimal: { value: control.value, maxDecimals } };
  };
}

/**
 * Validador para formato de dinero (exactamente 2 decimales)
 */
export function moneyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value && control.value !== 0) {
      return null;
    }

    const value = typeof control.value === 'number' 
      ? control.value 
      : parseFloat(control.value.toString().replace(/,/g, ''));

    if (isNaN(value)) {
      return { money: { value: control.value, message: 'Valor inválido' } };
    }

    // Validar que tenga máximo 2 decimales
    const decimalPart = value.toString().split('.')[1];
    if (decimalPart && decimalPart.length > 2) {
      return { money: { value: control.value, message: 'Máximo 2 decimales' } };
    }

    return null;
  };
}

/**
 * Validador para rango numérico
 * @param min Valor mínimo
 * @param max Valor máximo
 */
export function rangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value && control.value !== 0) {
      return null;
    }

    const value = parseFloat(control.value);

    if (isNaN(value)) {
      return { range: { value: control.value, min, max, message: 'Valor inválido' } };
    }

    if (value < min || value > max) {
      return { range: { value, min, max, message: `Debe estar entre ${min} y ${max}` } };
    }

    return null;
  };
}

/**
 * Validador para teléfono
 * @param exactLength Longitud exacta requerida (default: 9)
 */
export function phoneValidator(exactLength: number = 9): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const value = control.value.toString().replace(/[\s-]/g, ''); // Eliminar espacios y guiones
    const isValid = /^\d+$/.test(value) && value.length === exactLength;

    return isValid 
      ? null 
      : { phone: { value: control.value, exactLength, message: `Debe tener ${exactLength} dígitos` } };
  };
}

/**
 * Validador para longitud de texto
 * @param min Longitud mínima
 * @param max Longitud máxima
 */
export function textLengthValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const length = control.value.toString().trim().length;

    if (length < min) {
      return { textLength: { length, min, max, message: `Mínimo ${min} caracteres` } };
    }

    if (length > max) {
      return { textLength: { length, min, max, message: `Máximo ${max} caracteres` } };
    }

    return null;
  };
}

/**
 * Validador para fecha en formato dd/MM/yyyy
 */
export function dateFormatValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const value = control.value.toString().trim();
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (!regex.test(value)) {
      return { dateFormat: { value, message: 'Formato debe ser dd/MM/yyyy' } };
    }

    // Validar que la fecha sea válida
    const parts = value.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const date = new Date(year, month, day);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month ||
      date.getDate() !== day
    ) {
      return { dateFormat: { value, message: 'Fecha inválida' } };
    }

    return null;
  };
}

/**
 * Validador para rango de fechas
 * @param minDate Fecha mínima
 * @param maxDate Fecha máxima
 */
export function dateRangeValidator(minDate?: Date, maxDate?: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const value = control.value instanceof Date ? control.value : new Date(control.value);

    if (isNaN(value.getTime())) {
      return { dateRange: { value: control.value, message: 'Fecha inválida' } };
    }

    if (minDate && value < minDate) {
      return { 
        dateRange: { 
          value, 
          minDate, 
          message: `Fecha debe ser posterior a ${minDate.toLocaleDateString('es-PE')}` 
        } 
      };
    }

    if (maxDate && value > maxDate) {
      return { 
        dateRange: { 
          value, 
          maxDate, 
          message: `Fecha debe ser anterior a ${maxDate.toLocaleDateString('es-PE')}` 
        } 
      };
    }

    return null;
  };
}

/**
 * Validador para email (más estricto que el de Angular)
 */
export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = regex.test(control.value);

    return isValid ? null : { email: { value: control.value, message: 'Email inválido' } };
  };
}

/**
 * Validador para solo números (permite pegar y normaliza)
 */
export function numericOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const value = control.value.toString();
    const isValid = /^\d+(\.\d+)?$/.test(value);

    return isValid ? null : { numericOnly: { value: control.value, message: 'Solo números' } };
  };
}
