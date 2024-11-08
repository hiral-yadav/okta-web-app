import { ApplicationConfig, importProvidersFrom, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { OKTA_AUTH, OktaAuthModule } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { routes } from './app.routes';
import { HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';

const authInterceptor: HttpInterceptorFn = (req, next, oktaAuth = inject(OKTA_AUTH)) => {
  let request = req;
  const allowedOrigins = ['/api'];
  const accessToken = oktaAuth.getAccessToken();
  if (accessToken && !!allowedOrigins.find(origin => req.url.includes(origin))) {
    request = req.clone({ setHeaders: { 'Authorization': `Bearer ${accessToken}` } });
  }

  return next(request);
};

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      OktaAuthModule.forRoot({
        oktaAuth: new OktaAuth({
          issuer: 'https://dev-77904950.okta.com/oauth2/ausko9px1ghcgBXsb5d7',
          clientId: '0oakrx7h1lYlJB4EZ5d7',
          redirectUri: `${window.location.origin}/login/callback`,
          scopes: ['openid', 'offline_access', 'profile']
        })
      })
    ),
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      authInterceptor
    ]))
  ]
};

