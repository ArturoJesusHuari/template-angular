import { Directive, ElementRef, HostListener } from '@angular/core';

/**
 * Directiva para inputs numéricos (solo números, permite decimales)
 * Uso: <input type="text" appNumericInput>
 */
@Directive({
  selector: '[appNumericInput]',
  standalone: true,
})
export class NumericInputDirective {
  private regex: RegExp = /^[0-9]*\.?[0-9]*$/;

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (!this.regex.test(value)) {
      input.value = value.slice(0, -1);
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';
    const sanitized = pastedText.replace(/[^0-9.]/g, '');
    
    if (this.regex.test(sanitized)) {
      document.execCommand('insertText', false, sanitized);
    }
  }
}
