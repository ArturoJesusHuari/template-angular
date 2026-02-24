import { ApplicationConfig, provideZoneChangeDetection, isDevMode, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

import { routes } from './app.routes';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { DashboardRepository } from './features/dashboard/domain/dashboard.domain';
import { DashboardRepositoryImpl } from './features/dashboard/data/dashboard.data';
import { CustomDateAdapter } from './core/adapters/custom-date.adapter';
import { DATE_FORMAT_PROVIDER } from './core/config/date-formats.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideAnimationsAsync(),
    provideStore({}),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(), autoPause: true }),
    // Dashboard: vincular contrato → implementación
    { provide: DashboardRepository, useClass: DashboardRepositoryImpl },
    // Locale y fechas
    { provide: LOCALE_ID, useValue: 'es-PE' },
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
    { provide: DateAdapter, useClass: CustomDateAdapter },
    DATE_FORMAT_PROVIDER,
  ],
};
