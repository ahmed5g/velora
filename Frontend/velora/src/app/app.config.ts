import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations} from '@angular/platform-browser/animations'

import { routes } from './app.routes';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {provideHttpClient, withInterceptors, withXsrfConfiguration} from '@angular/common/http';
import {authExpired} from './core/auth/auth-expired.interceptor';




export const appConfig: ApplicationConfig = {

  providers: [
    provideAnimations(),
    provideHttpClient(
      withXsrfConfiguration({
        cookieName:"XSRF-TOKEN", headerName:"X-XSRF-TOKEN"
      }),
      withInterceptors([authExpired])
    ),
    providePrimeNG({ theme: { preset: Aura } }),

    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
