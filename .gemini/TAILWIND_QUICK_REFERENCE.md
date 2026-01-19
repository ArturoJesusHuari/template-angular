# Quick Reference - Tailwind Classes más Usadas

## 📦 Containers & Layout

```html
<!-- Container Principal (TODAS las páginas) -->
<div class="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">

<!-- Headers -->
<header class="mb-10">
  <h1 class="text-3xl font-bold text-white tracking-tight mb-2">Título</h1>
  <p class="text-[#a0a0a0] text-sm">Descripción</p>
</header>
```

## 🎨 Cards & Sections

```html
<!-- Card Component (YA tiene estilos) -->
<app-card title="Título" subtitle="Subtítulo" class="mb-6">

<!-- Divider con Título -->
<div class="flex items-center gap-3 pb-3 border-b border-[#2a2a2a]">
  <mat-icon class="text-[#3ecf8e]">icon_name</mat-icon>
  <h3 class="text-base font-semibold text-white">Sección</h3>
</div>

<!-- Sección con spacing vertical -->
<div class="space-y-6">
```

## 📐 Grids & Flex

```html
<!-- Grid 2 columnas responsive -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">

<!-- Grid 3 columnas responsive -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<!-- Flex responsive -->
<div class="flex flex-col sm:flex-row gap-3">

<!-- Flex items-center justify-between -->
<div class="flex items-center justify-between">
```

## 🔘 Botones

```html
<!-- Material Buttons (override estilo) -->
<button mat-flat-button color="primary" class="!rounded-lg !px-6 !py-3">
<button mat-stroked-button class="!rounded-lg">

<!-- Custom Button Component -->
<app-button variant="primary" size="md" icon="add">Texto</app-button>
```

## 🏷️ Badges

```html
<app-badge variant="success">Activo</app-badge>
<app-badge variant="error" icon="error">Error</app-badge>
```

## 📝 Form Fields

```html
<!-- Material Form Field -->
<mat-form-field appearance="outline" class="w-full">
  <mat-label>Label</mat-label>
  <input matInput>
</mat-form-field>

<!-- Con icono prefix -->
<mat-icon matPrefix class="mr-2 opacity-50">icon</mat-icon>

<!-- Checkbox -->
<mat-checkbox class="text-[#f0f0f0]">Texto</mat-checkbox>
```

## 🎨 Colores

```html
<!-- Fondos -->
bg-[#0f0f0f]          → Fondo página
bg-[#111111]          → Cards
bg-[#1a1a1a]          → Superficies
bg-[#1f1f1f]          → Hover
bg-[#242424]          → Input focus

<!-- Bordes -->
border-[#2a2a2a]      → Dividers (más común)
border-[#3ecf8e]      → Accent/Focus

<!-- Texto -->
text-white            → Principal
text-[#a0a0a0]        → Secundario
text-[#707070]        → Terciario
text-[#3ecf8e]        → Accent
```

## 📏 Spacing

```html
<!-- Vertical -->
space-y-6             → Entre items en sección
space-y-8             → Entre secciones grandes
mb-10                 → Debajo del header
mb-6                  → Entre cards
gap-6                 → En grids

<!-- Padding -->
p-6 md:p-8           → Container
px-4 py-3            → Items pequeños
px-6 py-4            → Items normales

<!-- Horizontal -->
gap-3                → Entre botones
```

## 🎯 Estados Comunes

```html
<!-- Hover -->
hover:bg-[#1f1f1f]
hover:border-[#3ecf8e]/30
hover:-translate-y-1

<!-- Transitions -->
transition-colors
transition-all duration-300

<!-- Responsive -->
md:p-8               → Padding mayor en tablet+
md:grid-cols-2       → 2 columnas en tablet+
lg:grid-cols-3       → 3 columnas en desktop
sm:flex-row          → Flex row en mobile+
```

## 💡 Patrones Rápidos

### Loading Spinner
```html
<div class="w-8 h-8 border-2 border-[#3ecf8e]/30 border-t-[#3ecf8e] rounded-full animate-spin"></div>
```

### Empty State
```html
<div class="flex flex-col items-center justify-center py-20 text-center">
  <mat-icon class="!text-6xl !w-16 !h-16 text-[#707070] mb-4">inbox</mat-icon>
  <h3 class="text-lg font-semibold text-white mb-2">Sin datos</h3>
</div>
```

### List Item
```html
<div class="p-4 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#3ecf8e]/30 transition-colors">
```

### Tabla con border
```html
<div class="overflow-x-auto rounded-lg border border-[#2a2a2a]">
  <table mat-table>
```

### Row hover
```html
<tr class="hover:bg-[#1f1f1f] transition-colors">
```

---

## 🚀 Copy-Paste Templates

### Header Completo
```html
<header class="mb-10">
  <h1 class="text-3xl font-bold text-white tracking-tight mb-2">Título</h1>
  <p class="text-[#a0a0a0] text-sm">Descripción de la página</p>
</header>
```

### Sección con Divider
```html
<div class="space-y-6">
  <div class="flex items-center gap-3 pb-3 border-b border-[#2a2a2a]">
    <mat-icon class="text-[#3ecf8e]">dashboard</mat-icon>
    <h3 class="text-base font-semibold text-white">Título</h3>
  </div>
  <!-- Contenido -->
</div>
```

### Form Actions
```html
<div class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[#2a2a2a]">
  <button mat-stroked-button class="!rounded-lg !px-6 !py-3 flex-1 sm:flex-none">
    Cancelar
  </button>
  <button mat-flat-button color="primary" class="!rounded-lg !px-6 !py-3 flex-1">
    Guardar
  </button>
</div>
```

### Card con Contenido
```html
<app-card title="Sección" subtitle="Descripción" class="mb-6">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Items -->
  </div>
</app-card>
```

---

## 🎓 Trucos de Pro

1. **!important en Material**: Usa `!` para override: `!rounded-lg`, `!px-6`
2. **Opacity en colores**: `/30` = 30% opacity: `border-[#3ecf8e]/30`
3. **Arbitrary values**: `text-[#a0a0a0]` para colores custom
4. **Negative margins**: `-translate-y-1` para hover effects
5. **Group hover**: `group-hover:` para efectos en hijos

---

## 📱 Breakpoints

```css
sm:   → 640px+  (mobile landscape)
md:   → 768px+  (tablet) ⭐
lg:   → 1024px+ (desktop)
xl:   → 1280px+ (large desktop)
2xl:  → 1536px+ (extra large)
```

---

**Nota**: Siempre prefiere usar componentes (`<app-card>`, `<app-button>`, `<app-badge>`) antes que recrear estilos.
