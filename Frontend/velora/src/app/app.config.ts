import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations} from '@angular/platform-browser/animations'

import { routes } from './app.routes';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';




export const appConfig: ApplicationConfig = {

  providers: [
    provideAnimations(),
    providePrimeNG({ theme: { preset: Aura } }),
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
