# Guía: Agregar Nueva Página con Estilo Consistente

Esta guía te muestra cómo crear nuevas páginas siguiendo el sistema de diseño establecido.

---

## 📝 Template Base para Nuevas Páginas

### HTML Template

```html
<div class="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
  <!-- 1. HEADER -->
  <header class="mb-10">
    <h1 class="text-3xl font-bold text-white tracking-tight mb-2">
      Título de la Página
    </h1>
    <p class="text-[#a0a0a0] text-sm">
      Descripción breve de lo que hace esta página.
    </p>
  </header>

  <!-- 2. CONTENIDO PRINCIPAL -->
  
  <!-- Opción A: Card Simple -->
  <app-card title="Título de Sección" subtitle="Descripción opcional">
    <!-- Tu contenido aquí -->
  </app-card>

  <!-- Opción B: Multiple Cards -->
  <app-card title="Primera Sección" class="mb-6">
    <!-- Contenido -->
  </app-card>

  <app-card title="Segunda Sección" class="mb-6">
    <!-- Contenido -->
  </app-card>

  <!-- Opción C: Grid de Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <app-card title="Card 1">...</app-card>
    <app-card title="Card 2">...</app-card>
    <app-card title="Card 3">...</app-card>
  </div>
</div>
```

### TypeScript Component

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';

@Component({
  selector: 'app-mi-nueva-pagina',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    CardComponent,
    ButtonComponent,
    BadgeComponent,
  ],
  templateUrl: './mi-nueva-pagina.page.html',
})
export class MiNuevaPaginaPage {
  // Tu lógica aquí
}
```

---

## 🎨 Patrones de Diseño Comunes

### 1. Sección con Divider

```html
<div class="space-y-6">
  <!-- Divider con icono y título -->
  <div class="flex items-center gap-3 pb-3 border-b border-[#2a2a2a]">
    <mat-icon class="text-[#3ecf8e]">dashboard</mat-icon>
    <h3 class="text-base font-semibold text-white">Título de Sección</h3>
  </div>
  
  <!-- Contenido de la sección -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Items -->
  </div>
</div>
```

### 2. Grid Responsivo de Formulario

```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <mat-form-field appearance="outline" class="w-full">
    <mat-label>Campo 1</mat-label>
    <input matInput>
  </mat-form-field>
  
  <mat-form-field appearance="outline" class="w-full">
    <mat-label>Campo 2</mat-label>
    <input matInput>
  </mat-form-field>
</div>
```

### 3. Botones de Acción

```html
<!-- Botones flex responsivos -->
<div class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[#2a2a2a]">
  <button mat-stroked-button class="!rounded-lg !px-6 !py-3 flex-1 sm:flex-none">
    Cancelar
  </button>
  <button mat-flat-button color="primary" class="!rounded-lg !px-6 !py-3 flex-1">
    Guardar
  </button>
</div>

<!-- O usando componentes personalizados -->
<div class="flex flex-wrap gap-3">
  <app-button variant="outline">Cancelar</app-button>
  <app-button variant="primary" icon="save">Guardar</app-button>
</div>
```

### 4. Lista con Estados (Badges)

```html
<div class="space-y-3">
  @for (item of items; track item.id) {
    <div class="flex items-center justify-between p-4 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#3ecf8e]/30 transition-colors">
      <div>
        <h4 class="text-sm font-medium text-white">{{ item.name }}</h4>
        <p class="text-xs text-[#a0a0a0] mt-1">{{ item.description }}</p>
      </div>
      <app-badge [variant]="item.status === 'active' ? 'success' : 'neutral'">
        {{ item.status }}
      </app-badge>
    </div>
  }
</div>
```

### 5. Empty State

```html
<div class="flex flex-col items-center justify-center py-20 text-center">
  <mat-icon class="!text-6xl !w-16 !h-16 text-[#707070] mb-4">
    inbox
  </mat-icon>
  <h3 class="text-lg font-semibold text-white mb-2">
    No hay datos disponibles
  </h3>
  <p class="text-sm text-[#a0a0a0] mb-6 max-w-md">
    Comienza creando tu primer elemento haciendo clic en el botón de abajo.
  </p>
  <app-button variant="primary" icon="add">
    Crear Nuevo
  </app-button>
</div>
```

### 6. Loading State

```html
@if (loading) {
  <div class="flex flex-col items-center justify-center py-20">
    <div class="w-8 h-8 border-2 border-[#3ecf8e]/30 border-t-[#3ecf8e] rounded-full animate-spin"></div>
    <p class="mt-4 text-sm text-[#a0a0a0]">Cargando datos...</p>
  </div>
} @else {
  <!-- Contenido -->
}
```

---

## 📐 Sistema de Espaciado (Spacing Scale)

### Padding/Margin Vertical
```css
gap-1, space-y-1        → 0.25rem (4px)   - Muy pequeño
gap-2, space-y-2        → 0.5rem (8px)    - Pequeño
gap-3, space-y-3        → 0.75rem (12px)  - Compacto
gap-4, space-y-4        → 1rem (16px)     - Standard
gap-6, space-y-6        → 1.5rem (24px)   - Amplio ⭐ (secciones)
gap-8, space-y-8        → 2rem (32px)     - Muy amplio ⭐ (bloques)
mb-10                   → 2.5rem (40px)   - Headers ⭐
```

### Padding Horizontal
```css
px-3, py-1.5           → Botones small
px-4, py-2.5           → Botones medium ⭐
px-6, py-3             → Botones large
```

### Container Padding
```css
p-6 md:p-8            → Container principal ⭐
px-4, py-3            → Cards pequeñas
px-6, py-4 o py-6     → Cards standard ⭐
```

---

## 🎨 Colores a Usar

### Fondos
```html
bg-[#0f0f0f]          → Fondo principal página
bg-[#111111]          → Cards (ya definido en CardComponent)
bg-[#1a1a1a]          → Superficies secundarias
bg-[#1f1f1f]          → Hover states
bg-[#242424]          → Emphasis
```

### Bordes
```html
border-[#1f1f1f]      → Muy sutil (cards)
border-[#2a2a2a]      → Sutil (dividers) ⭐
border-[#353535]      → Default (inputs)
border-[#3ecf8e]      → Accent (focus, hover) ⭐
```

### Texto
```html
text-white            → Títulos principales ⭐
text-[#f0f0f0]        → Texto alternativo blanco
text-[#a0a0a0]        → Texto secundario ⭐
text-[#707070]        → Texto terciario (hints)
text-[#3ecf8e]        → Accent text (iconos, links) ⭐
```

---

## ✅ Checklist para Nueva Página

Antes de considerar completa una nueva página, verifica:

- [ ] Usa el contenedor principal: `p-6 md:p-8 max-w-7xl mx-auto min-h-screen`
- [ ] Tiene header con título y descripción: `mb-10`
- [ ] Usa `<app-card>` para secciones contenedoras
- [ ] Spacing vertical consistente: `space-y-6` o `space-y-8`
- [ ] Grid responsivo donde aplica: `grid-cols-1 md:grid-cols-2 gap-6`
- [ ] Colores de la paleta Supabase (no colores aleatorios)
- [ ] Iconos de Material Icons con color accent
- [ ] Botones con rounded: `!rounded-lg`
- [ ] Estados de loading/empty implementados
- [ ] **NO HAY CSS PERSONALIZADO** - Solo Tailwind
- [ ] Componentes importados correctamente en TypeScript

---

## 🚫 ¡NO Hacer!

### ❌ Evitar:
```html
<!-- NO: Clases custom -->
<div class="my-custom-container">

<!-- NO: Estilos inline -->
<div style="padding: 20px">

<!-- NO: Colores no definidos -->
<div class="bg-blue-500">

<!-- NO: Spacing inconsistente -->
<div class="mt-3 mb-7">
```

### ✅ Hacer:
```html
<!-- SÍ: Tailwind + componentes -->
<div class="p-6 md:p-8 max-w-7xl mx-auto">

<!-- SÍ: Colores de la paleta -->
<div class="bg-[#1a1a1a] border border-[#2a2a2a]">

<!-- SÍ: Spacing de la escala -->
<div class="space-y-6">
```

---

## 📚 Recursos

- **Documentación de componentes**: `/src/app/shared/components/README.md`
- **Ejemplos de uso**: 
  - `components-demo.page.html` - Componentes
  - `forms-demo.page.html` - Formularios
  - `tables-demo.page.html` - Tablas
  - `dashboard.page.html` - Dashboard

- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Material Icons**: https://fonts.google.com/icons

---

## 💡 Tips Finales

1. **Copia lo que funciona**: Usa las páginas existentes como referencia
2. **Consistencia es clave**: Siempre usa las mismas clases para los mismos propósitos
3. **Mobile first**: Diseña primero para mobile, luego agrega breakpoints
4. **Spacing scale**: Sigue la escala 4-6-8-10 para margins
5. **Componentes primero**: Si algo se repite, crea un componente
6. **Dark theme**: Siempre piensa en fondos oscuros y buen contraste

---

¡Listo para crear páginas hermosas y consistentes! 🚀
