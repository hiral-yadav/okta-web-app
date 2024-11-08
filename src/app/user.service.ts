import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.dev';
import { OKTA_AUTH } from '@okta/okta-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authService = inject(OKTA_AUTH);
  private users = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient) { }

  public getUsers() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.getAccessToken()
    });

    this.httpClient
      .get(environment.listUsers, { headers })
      .subscribe(user => {
        this.users.next(user);
      });
  }

  public assignApp() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getAccessToken()
    });

    let u = { "id": "00uky56vuwj6rKBZ75d7" };
    this.httpClient
      .post(environment.assignApp, u, { headers })
      .subscribe(user => {
        this.getUsers();
      });
  }

  public getUsersObservable() {
    return this.users.asObservable();
  }

  public editUser() {

  }

  public addUser(user) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getAccessToken()
    });

    this.httpClient.post<any>(environment.addUser, user, { headers }).subscribe(u => console.log("User Added...."));
    this.getUsers();
  }

  public deleteUser() {

  }

}
