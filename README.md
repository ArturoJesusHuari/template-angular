# Angular Enterprise Template

Template base profesional para proyectos empresariales Angular con arquitectura escalable.

## 🏗️ Arquitectura

Este template sigue una arquitectura limpia y modular basada en las mejores prácticas de Angular:

```
/src/app
├── /core                    # Servicios singleton, guards, interceptors
│   ├── /guards             # Guards de navegación
│   ├── /interceptors       # HTTP interceptors
│   └── /services           # Servicios core (API, Auth, etc.)
│
├── /shared                  # Módulos y componentes compartidos
│   ├── /components         # Componentes reutilizables
│   ├── /directives         # Directivas personalizadas
│   ├── /pipes              # Pipes personalizados
│   └── /models             # Modelos de datos compartidos
│
├── /layout                  # Componentes de layout
│   ├── /components
│   │   ├── /sidebar        # Navegación lateral
│   │   ├── /header         # Cabecera
│   │   └── /footer         # Pie de página
│   └── layout.component.ts # Layout principal
│
└── /features                # Módulos de funcionalidades
    ├── /dashboard
    │   ├── /data           # NgRx (actions, reducers, effects, selectors)
    │   ├── /domain         # Modelos y lógica de negocio
    │   └── /presentation   # Componentes de UI
    │
    ├── /components-demo    # Demostración de Material Components
    ├── /forms-demo         # Ejemplos de formularios reactivos
    ├── /tables-demo        # Tablas con paginación y ordenamiento
    └── /ui-demo            # Componentes UI personalizados
```

## 🚀 Tecnologías

- **Angular 21** - Framework principal
- **Angular Material** - Componentes UI
- **Tailwind CSS** - Utilidades de estilo
- **NgRx** - Gestión de estado (Store + Effects)
- **RxJS** - Programación reactiva
- **TypeScript** - Tipado estático

## 📦 Instalación

```bash
npm install
```

## 🏃‍♂️ Desarrollo

```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200/`

## 🏗️ Build

```bash
npm run build
```

## 🧪 Testing

```bash
npm test
```

## 📋 Características Principales

### ✅ Core
- **Guards**: Protección de rutas con `authGuard`
- **Interceptors**: HTTP interceptor para headers y logging
- **Services**: Servicio API base para llamadas HTTP

### ✅ Layout
- **Sidebar**: Navegación lateral fija con Material Sidenav
- **Header**: Barra superior con menús de usuario y notificaciones
- **Footer**: Pie de página con información dinámica
- **Responsive**: Diseño adaptable a todos los dispositivos

### ✅ Features

### Login
- Formulario de login
- Validaciones
- Manejo de errores

#### Dashboard
- Cards con estadísticas
- Integración completa con NgRx
- Loading states y error handling
- Datos simulados con delay

#### Componentes Material
- Botones 
- Sidebar
- Dialogs
- Snackbars
- Menús
- Tooltips

#### Formularios
- Reactive Forms
- Validaciones
- Inputs, Selects, Checkboxes, Datepickers
- Radio buttons
- Manejo de errores

#### Tablas
- MatTable con datos mock
- Paginación
- Ordenamiento
- Filtrado
- Acciones por fila


### ✅ NgRx Store

Implementación completa de NgRx en el feature Dashboard:

- **Actions**: Definición de acciones
- **Reducers**: Gestión de estado
- **Effects**: Side effects (llamadas API)
- **Selectors**: Selección de datos del store
- **DevTools**: Integración con Redux DevTools

### ✅ Routing

- Lazy loading para todas las features
- Guards de autenticación
- Redirecciones configuradas
- Rutas protegidas

## 🎨 Estilos

### Tailwind CSS
- Configurado para trabajar con Angular Material
- Utilidades para spacing, layout y colores
- No reemplaza componentes Material
- No usar css en lo posible, puro tailwind


## 🔧 Configuración

### Environments
- `environment.ts` - Desarrollo
- `environment.prod.ts` - Producción

### Variables de Entorno
```typescript
{
  production: boolean,
  apiUrl: string
}
```

## 📝 Convenciones

### Nomenclatura
- **Components**: `*.component.ts`
- **Pages**: `*.page.ts`
- **Services**: `*.service.ts`
- **Guards**: `*.guard.ts`
- **Interceptors**: `*.interceptor.ts`
- **Models**: `*.model.ts`

### Estructura de Features
Cada feature sigue la arquitectura:
```
/feature-name
  /data           # Capa de datos (NgRx, API)
  /domain         # Lógica de negocio y modelos
  /presentation   # Componentes UI
```

## 🔐 Seguridad

- HTTP Interceptor configurado
- Guards de autenticación
- Validación de formularios
- Manejo de errores centralizado

## 📚 Próximos Pasos

Para extender este template:

1. **Agregar nuevas features**: Crear carpeta en `/features` siguiendo la estructura
2. **Configurar NgRx**: Agregar reducer y effects en `app.config.ts`
3. **Crear componentes**: Usar componentes compartidos de `/shared`
4. **Implementar API real**: Actualizar `ApiService` y repositories
5. **Personalizar tema**: Modificar `material-theme.scss`

## 🤝 Contribución

Este es un template base. Personalízalo según las necesidades de tu proyecto.
