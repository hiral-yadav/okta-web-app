import { Routes } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'users', component: UsersComponent, canActivate: [OktaAuthGuard] },
  { path: 'login/callback', component: OktaCallbackComponent }
];