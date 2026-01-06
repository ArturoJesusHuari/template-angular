import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CustomDatePipe } from '../../../shared/pipes/custom-date.pipe';
import { CurrencyPipe } from '../../../shared/pipes/currency.pipe';
import {
  integerValidator,
  decimalValidator,
  moneyValidator,
  phoneValidator,
  textLengthValidator,
  rangeValidator,
  emailValidator,
} from '../../../shared/validators/custom-validators';
import { NumericInputDirective } from '../../../shared/directives/numeric-input.directive';
import { IntegerInputDirective } from '../../../shared/directives/integer-input.directive';
import { MoneyInputDirective } from '../../../shared/directives/money-input.directive';
import { PhoneInputDirective } from '../../../shared/directives/phone-input.directive';

interface Country {
  code: string;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-forms-demo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatButtonModule,
    MatRadioModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
    CardComponent,
    CurrencyPipe,
    NumericInputDirective,
    IntegerInputDirective,
    MoneyInputDirective,
    PhoneInputDirective,
  ],
  template: `
    <div class="forms-container">
      <header class="page-header">
        <h1 class="page-title">Configuración de Perfil</h1>
        <p class="page-subtitle">Gestione la información técnica y financiera del usuario.</p>
      </header>

      <!-- FORMULARIO PRINCIPAL -->
      <app-card title="Editor de Entidad" subtitle="Complete los campos requeridos para la normalización de datos.">
        <form [formGroup]="mainForm" (ngSubmit)="onSubmit()" class="form-grid">
          
          <!-- SECCIÓN: DATOS PERSONALES -->
          <div class="form-section">
            <div class="section-header">
              <h3 class="section-title">
                <mat-icon>person</mat-icon> Identidad
              </h3>
            </div>
            
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Nombre Completo</mat-label>
              <input matInput formControlName="fullName" placeholder="Ej: Juan Pérez">
              @if (mainForm.get('fullName')?.hasError('required') && mainForm.get('fullName')?.touched) {
                <mat-error>El nombre es requerido</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Email Corporativo</mat-label>
              <input matInput formControlName="email" type="email" placeholder="ejemplo@empresa.com">
              @if (mainForm.get('email')?.hasError('required') && mainForm.get('email')?.touched) {
                <mat-error>El email es requerido</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Teléfono de Contacto</mat-label>
              <input matInput formControlName="phone" appPhoneInput [phoneLength]="9" placeholder="987654321">
              <mat-hint>9 dígitos sin espacios</mat-hint>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>País</mat-label>
              <mat-select formControlName="country">
                @for (country of countries; track country.code) {
                  <mat-option [value]="country.code">{{ country.name }}</mat-option>
                }
              </mat-select>
            </mat-form-field>
          </div>

          <!-- SECCIÓN: DATOS FINANCIEROS -->
          <div class="form-section">
            <div class="section-header">
              <h3 class="section-title">
                <mat-icon>payments</mat-icon> Finanzas
              </h3>
            </div>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Salario Base (USD)</mat-label>
              <input matInput formControlName="salary" appMoneyInput placeholder="0.00">
              <mat-icon matPrefix style="margin-right: 8px; opacity: 0.5;">attach_money</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Precio de Venta</mat-label>
              <input matInput formControlName="productPrice" appMoneyInput placeholder="0.00">
              <mat-icon matPrefix style="margin-right: 8px; opacity: 0.5;">local_offer</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Edad</mat-label>
              <input matInput formControlName="age" appIntegerInput placeholder="25">
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Peso (KG)</mat-label>
              <input matInput formControlName="weight" appNumericInput placeholder="75.5">
            </mat-form-field>
          </div>

          <!-- SECCIÓN: CATEGORÍAS Y TÉRMINOS -->
          <div class="form-section form-section-full">
            <div class="section-header">
              <h3 class="section-title">
                <mat-icon>rule</mat-icon> Clasificación y Cumplimiento
              </h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Categorías Asignadas</mat-label>
                <mat-select formControlName="categories" multiple>
                  @for (category of categories; track category.id) {
                    <mat-option [value]="category.id">{{ category.name }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>

              <div class="flex flex-col gap-4">
                <mat-checkbox formControlName="acceptTerms">
                  Acepto los términos de servicio
                </mat-checkbox>
                <mat-checkbox formControlName="newsletter">
                  Suscribirse al boletín técnico
                </mat-checkbox>
              </div>
            </div>
          </div>

          <!-- BOTONES DE ACCIÓN -->
          <div class="form-actions">
            <button 
              mat-stroked-button 
              type="button" 
              (click)="resetForm()"
              [disabled]="isSubmitting"
              class="reset-button">
              Descartar Cambios
            </button>
            <button 
              mat-flat-button 
              color="primary" 
              type="submit" 
              [disabled]="!mainForm.valid || isSubmitting"
              class="submit-button">
              @if (isSubmitting) {
                <mat-spinner diameter="20" style="margin-right: 8px; display: inline-block;"></mat-spinner>
                <span>Procesando...</span>
              } @else {
                <div class="flex items-center gap-2">
                  <mat-icon>save</mat-icon>
                  <span>Guardar Cambios</span>
                </div>
              }
            </button>
          </div>
        </form>

        <!-- RESUMEN DE DATOS (MODO LECTURA) -->
        @if (submittedData) {
          <div class="submitted-data-card p-6 mt-8 bg-surface border-subtle rounded-lg">
            <div class="flex items-center gap-2 mb-4 text-green-500">
              <mat-icon>check_circle</mat-icon>
              <h3 class="font-bold">Datos Normalizados Correctamente</h3>
            </div>
            
            <div class="data-grid">
              <div class="data-item">
                <span class="data-label">Identidad</span>
                <span class="data-value">{{ submittedData.fullName }}</span>
              </div>
              <div class="data-item">
                <span class="data-label">Email</span>
                <span class="data-value">{{ submittedData.email }}</span>
              </div>
              <div class="data-item">
                <span class="data-label">Contacto</span>
                <span class="data-value">+51 {{ submittedData.phone }}</span>
              </div>
              <div class="data-item">
                <span class="data-label">Compensación</span>
                <span class="data-value">{{ submittedData.salary | currency }}</span>
              </div>
              <div class="data-item">
                <span class="data-label">Precio</span>
                <span class="data-value">{{ submittedData.productPrice | currency }}</span>
              </div>
              <div class="data-item">
                <span class="data-label">Clasificación</span>
                <span class="data-value">{{ getCategoryNames(submittedData.categories) }}</span>
              </div>
            </div>
          </div>
        }
      </app-card>
    </div>
  `,
  styles: [`
    .forms-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
    }

    .page-header {
      margin-bottom: 2.5rem;
    }

    .page-title {
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--text-primary);
      letter-spacing: -0.025em;
      margin-bottom: 0.5rem;
    }

    .page-subtitle {
      font-size: 1.125rem;
      color: var(--text-secondary);
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    @media (min-width: 1024px) {
      .form-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .form-section-full {
        grid-column: span 2;
      }
      
      .form-actions {
        grid-column: span 2;
        justify-content: flex-end;
      }
    }

    .form-section {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      padding: 1.75rem;
      background-color: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      height: 100%;
    }

    .section-header {
      margin-bottom: 0.5rem;
      border-bottom: 1px solid var(--border-subtle);
      padding-bottom: 0.75rem;
    }

    .section-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--accent-primary);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      padding-top: 1.5rem;
      margin-top: 1rem;
      border-top: 1px solid var(--border-subtle);
    }

    .submit-button {
      padding: 0.75rem 2rem;
      font-weight: 600;
    }

    .reset-button {
      padding: 0.75rem 1.5rem;
    }

    .submitted-data-card {
      margin-top: 3rem;
      border: 1px solid var(--accent-primary);
      overflow: hidden;
    }

    .data-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1.5rem;
      padding: 1rem 0;
    }

    .data-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .data-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .data-value {
      font-size: 0.9375rem;
      color: var(--text-primary);
      font-weight: 500;
    }

    .w-full {
      width: 100%;
    }

    ::ng-deep .mat-mdc-form-field-subscript-wrapper {
      font-size: 0.75rem;
    }
  `],
})
export class FormsDemoPage implements OnInit {
  mainForm: FormGroup;
  submittedData: any = null;
  isSubmitting = false;

  countries: Country[] = [
    { code: 'pe', name: 'Perú' },
    { code: 'ar', name: 'Argentina' },
    { code: 'mx', name: 'México' },
    { code: 'es', name: 'España' },
    { code: 'us', name: 'Estados Unidos' },
    { code: 'co', name: 'Colombia' },
    { code: 'cl', name: 'Chile' },
  ];

  categories: Category[] = [
    { id: 1, name: 'Tecnología' },
    { id: 2, name: 'Finanzas' },
    { id: 3, name: 'Salud' },
    { id: 4, name: 'Educación' },
    { id: 5, name: 'Entretenimiento' },
    { id: 6, name: 'Deportes' },
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.mainForm = this.fb.group({
      // Datos personales
      fullName: ['', [Validators.required, textLengthValidator(3, 100)]],
      email: ['', [Validators.required, emailValidator()]],
      phone: ['', [Validators.required, phoneValidator(9)]],
      birthDate: ['', Validators.required],
      country: ['', Validators.required],

      // Datos numéricos
      age: ['', [Validators.required, integerValidator(), rangeValidator(18, 100)]],
      weight: ['', [decimalValidator(2)]],
      salary: ['', [Validators.required, moneyValidator()]],
      productPrice: ['', [moneyValidator(), rangeValidator(0.01, 999999.99)]],

      // Selección y opciones
      categories: [[], Validators.required],
      gender: ['male'],
      acceptTerms: [false, Validators.requiredTrue],
      newsletter: [false],

      // Información adicional
      comments: ['', textLengthValidator(10, 500)],
    });
  }

  ngOnInit(): void {
    // Inicialización adicional si es necesaria
  }

  onSubmit(): void {
    if (this.mainForm.valid) {
      this.isSubmitting = true;

      // Simular envío asíncrono
      setTimeout(() => {
        this.submittedData = this.mainForm.value;
        this.isSubmitting = false;

        this.snackBar.open('Formulario enviado correctamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success'],
        });

        console.log('Form submitted:', this.submittedData);
      }, 1500);
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.mainForm.controls).forEach(key => {
        this.mainForm.get(key)?.markAsTouched();
      });

      this.snackBar.open('Por favor, complete todos los campos requeridos', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
    }
  }

  resetForm(): void {
    this.mainForm.reset({
      gender: 'male',
      acceptTerms: false,
      newsletter: false,
    });
    this.submittedData = null;

    this.snackBar.open('Formulario limpiado', 'Cerrar', {
      duration: 2000,
    });
  }

  getCountryName(code: string): string {
    return this.countries.find(c => c.code === code)?.name || code;
  }

  getCategoryNames(ids: number[]): string {
    if (!ids || ids.length === 0) return 'Ninguna';
    return ids.map(id => this.categories.find(c => c.id === id)?.name || '').join(', ');
  }

  getGenderLabel(value: string): string {
    const labels: Record<string, string> = {
      male: 'Masculino',
      female: 'Femenino',
      other: 'Otro',
    };
    return labels[value] || value;
  }

  formatMoney(value: number): string {
    if (!value && value !== 0) return '0.00';
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
