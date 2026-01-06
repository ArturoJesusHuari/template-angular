import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from '../../../shared/components/card/card.component';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-ui-demo',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    CardComponent,
    HighlightDirective,
    TruncatePipe,
  ],
  template: `
    <div class="ui-demo-container">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">UI Demo</h1>

      <app-card title="Componentes Compartidos" subtitle="Ejemplos de componentes reutilizables">
        <p class="text-gray-700 mb-4">
          Esta sección demuestra componentes, directivas y pipes personalizados.
        </p>
      </app-card>

      <app-card title="Directiva Highlight" subtitle="Resalta elementos al pasar el mouse">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div appHighlight="#ffeb3b" class="p-4 border rounded cursor-pointer">
            <p class="font-medium">Hover me (Amarillo)</p>
          </div>
          <div appHighlight="#4caf50" class="p-4 border rounded cursor-pointer">
            <p class="font-medium">Hover me (Verde)</p>
          </div>
          <div appHighlight="#2196f3" class="p-4 border rounded cursor-pointer">
            <p class="font-medium">Hover me (Azul)</p>
          </div>
        </div>
      </app-card>

      <app-card title="Pipe Truncate" subtitle="Acorta texto largo">
        <div class="space-y-4">
          <div>
            <p class="text-sm text-gray-500 mb-1">Texto original:</p>
            <p class="text-gray-800">{{ longText }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-1">Texto truncado (30 caracteres):</p>
            <p class="text-gray-800">{{ longText | truncate:30 }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-1">Texto truncado (50 caracteres):</p>
            <p class="text-gray-800">{{ longText | truncate:50 }}</p>
          </div>
        </div>
      </app-card>

      <app-card title="Gradientes y Animaciones" subtitle="Diseño moderno con Tailwind">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="gradient-card">
            <h3 class="text-xl font-bold text-white mb-2">Gradiente 1</h3>
            <p class="text-white opacity-90">De púrpura a rosa</p>
          </div>
          <div class="gradient-card-2">
            <h3 class="text-xl font-bold text-white mb-2">Gradiente 2</h3>
            <p class="text-white opacity-90">De azul a cyan</p>
          </div>
        </div>
      </app-card>

      <app-card title="Cards Interactivas" subtitle="Efectos hover modernos" [hasActions]="true">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          @for (item of features; track item.title) {
            <div class="feature-card">
              <mat-icon class="feature-icon">{{ item.icon }}</mat-icon>
              <h3 class="text-lg font-bold text-gray-800 mb-2">{{ item.title }}</h3>
              <p class="text-gray-600 text-sm">{{ item.description }}</p>
            </div>
          }
        </div>
        <div actions class="flex justify-end">
          <button mat-raised-button color="primary">Ver Más</button>
        </div>
      </app-card>
    </div>
  `,
  styles: [`
    .ui-demo-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .gradient-card {
      padding: 2rem;
      border-radius: 1rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .gradient-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(102, 126, 234, 0.4);
    }

    .gradient-card-2 {
      padding: 2rem;
      border-radius: 1rem;
      background: linear-gradient(135deg, #00b4db 0%, #0083b0 100%);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .gradient-card-2:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 180, 219, 0.4);
    }

    .feature-card {
      padding: 1.5rem;
      border: 2px solid #e2e8f0;
      border-radius: 0.75rem;
      text-align: center;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .feature-card:hover {
      border-color: #3b82f6;
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(59, 130, 246, 0.15);
    }

    .feature-icon {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      color: #3b82f6;
      margin: 0 auto 1rem;
    }
  `],
})
export class UiDemoPage {
  longText = 'Este es un texto muy largo que será truncado por el pipe personalizado. Demuestra cómo podemos crear pipes reutilizables para transformar datos en nuestras plantillas.';

  features = [
    {
      icon: 'speed',
      title: 'Rápido',
      description: 'Optimizado para máximo rendimiento',
    },
    {
      icon: 'security',
      title: 'Seguro',
      description: 'Protección de datos integrada',
    },
    {
      icon: 'devices',
      title: 'Responsive',
      description: 'Funciona en todos los dispositivos',
    },
  ];
}
