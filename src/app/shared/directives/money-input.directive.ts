import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Directiva para inputs de dinero con comportamiento financiero real
 * Los dígitos se ingresan como centavos de derecha a izquierda:
 * - 5 → 0.05
 * - 50 → 0.50
 * - 500 → 5.00
 * - 1234 → 12.34
 * Formato visual: 1,234.56 (comas para miles, 2 decimales exactos)
 */
@Directive({
  selector: '[appMoneyInput]',
  standalone: true,
})
export class MoneyInputDirective implements OnInit {
  private internalValue: number = 0;

  constructor(
    private el: ElementRef,
    private control: NgControl
  ) {}

  ngOnInit(): void {
    // Escuchar cambios programáticos del control
    this.control.valueChanges?.subscribe(value => {
      const numericValue = this.normalizeValue(value);
      if (numericValue !== this.internalValue) {
        this.internalValue = numericValue;
        this.updateDisplay();
      }
    });

    // Inicialización
    setTimeout(() => {
      this.internalValue = this.normalizeValue(this.control.value);
      this.updateDisplay();
    });
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const key = event.key;

    // Permitir teclas de control estándar
    if (['Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(key)) {
      return;
    }

    if (key === 'Backspace') {
      event.preventDefault();
      this.handleBackspace();
      return;
    }

    if (key === 'Delete') {
      event.preventDefault();
      this.internalValue = 0;
      this.updateDisplay();
      this.updateControl();
      return;
    }

    // Permitir Ctrl/Cmd + acciones comunes
    if ((event.ctrlKey || event.metaKey) && ['a', 'c', 'v', 'x'].includes(key.toLowerCase())) {
      return;
    }

    // Solo permitir dígitos
    if (!/^\d$/.test(key)) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    this.handleDigit(key);
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';
    const cleaned = pastedText.replace(/[^0-9.]/g, '');
    const parsedValue = parseFloat(cleaned);
    
    if (!isNaN(parsedValue)) {
      this.internalValue = parsedValue;
      this.updateDisplay();
      this.updateControl();
    }
  }

  private normalizeValue(value: any): number {
    if (value === null || value === undefined || value === '') return 0;
    const num = typeof value === 'number' ? value : parseFloat(value.toString().replace(/[^0-9.-]/g, ''));
    return isNaN(num) ? 0 : num;
  }

  private handleDigit(digit: string): void {
    const cents = Math.round(this.internalValue * 100);
    // Evitar desbordamiento si el número es ridículamente grande
    if (cents > 999999999999) return; 

    const newCents = (cents * 10) + parseInt(digit, 10);
    this.internalValue = newCents / 100;
    
    this.updateDisplay();
    this.updateControl();
  }

  private handleBackspace(): void {
    const cents = Math.round(this.internalValue * 100);
    const newCents = Math.floor(cents / 10);
    this.internalValue = newCents / 100;
    
    this.updateDisplay();
    this.updateControl();
  }

  private updateDisplay(): void {
    const input = this.el.nativeElement as HTMLInputElement;
    const formatted = this.internalValue.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    input.value = formatted;
  }

  private updateControl(): void {
    this.control.control?.setValue(this.internalValue, { 
      emitEvent: false, 
      emitModelToViewChange: false 
    });
    this.control.control?.markAsDirty();
    this.control.control?.markAsTouched();
  }
}
