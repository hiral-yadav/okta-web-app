import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { async } from 'rxjs';

export class customAuthGuard implements CanActivate {

  private authService = inject(OKTA_AUTH);
  private oktaStateService = inject(OktaAuthStateService);

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return (await this.authService.isAuthenticated()).valueOf();
  }

}