import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * Directiva para inputs de teléfono
 * Normaliza valores pegados y valida longitud
 * Uso: <input type="text" appPhoneInput [phoneLength]="9">
 */
@Directive({
  selector: '[appPhoneInput]',
  standalone: true,
})
export class PhoneInputDirective {
  @Input() phoneLength: number = 9;

  private regex: RegExp = /^[0-9]*$/;

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Solo números
    if (!this.regex.test(value)) {
      input.value = value.slice(0, -1);
      return;
    }

    // Limitar longitud
    if (value.length > this.phoneLength) {
      input.value = value.slice(0, this.phoneLength);
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';
    
    // Eliminar espacios, guiones y caracteres no numéricos
    const sanitized = pastedText.replace(/[\s-]/g, '').replace(/[^0-9]/g, '');
    
    // Limitar longitud
    const truncated = sanitized.slice(0, this.phoneLength);
    
    if (this.regex.test(truncated)) {
      document.execCommand('insertText', false, truncated);
    }
  }
}
