import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../user.service';
import { HttpClientModule } from '@angular/common/http';
import { AddUserComponent } from "../add-user/add-user.component";
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OKTA_AUTH } from '@okta/okta-angular';

@Component({
    selector: 'UsersComponent',
    templateUrl: './users.component.html',
    standalone: true,
    imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule,
        HttpClientModule, AddUserComponent, DialogModule, NgbModule],
    providers: [UserService],

})
export class UsersComponent implements OnInit, AfterViewInit {
    isAddUser = false;
    display = false;

    private oktaAuth = inject(OKTA_AUTH);
    users = [];

    constructor(private userservice: UserService) {
    }
    ngAfterViewInit(): void {
        console.log("ngAfterViewInit....");
    }

    ngOnInit() {
        this.userservice.getUsers();
        this.userservice.getUsersObservable().subscribe(u => {
            u.forEach(element => {
                let temp = {
                    'firstName' : element?.profile?.firstName,
                    'lastName': element?.profile?.lastName,
                    'email': element?.profile?.email,
                    'moobilePhone': element?.profile?.moobilePhone,
                    'status': element?.status,
                    'created': element?.created
                }
                this.users.push(temp)
            });
        });
        this.users.sort((a, b) => a.created.localeCompare(b.created));
    }

    makeAdmin() {

    }

    assignApp(event) {
        console.log('event' + event.data)
        this.userservice.assignApp();
    }

    addUser() {
        this.display = true;
    }

    refresh() {

    }
}