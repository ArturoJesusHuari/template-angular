import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  // Ejemplo: agregar token de autenticación
  const token = localStorage.getItem('auth_token');
  
  const clonedRequest = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  console.log('HTTP Request:', clonedRequest.url);

  return next(clonedRequest).pipe(
    finalize(() => {
      console.log('HTTP Request completed');
    })
  );
};
