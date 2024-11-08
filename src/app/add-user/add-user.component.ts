import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../users/user';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit, AfterViewInit {
  @Input() display: boolean = false;
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  ngAfterViewInit(): void {
    
  }

  close() {
    this.display = false;
    this.userForm.reset();
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.addUser();
    }
  }
  ngOnInit(): void {
    
  }

  addUser() {
    console.log('first name -> ' + this.userForm.get('firstName').value);
      
    let user: User = {
      "profile": {
        "firstName": this.userForm.controls['firstName'].value,
        "lastName": this.userForm.controls['lastName'].value,
        "email": this.userForm.controls['email'].value,
        "login": this.userForm.controls['email'].value,
        "mobilePhone": this.userForm.controls['mobile'].value,
      },
      "credentials": {
        "password": {
          "value": this.userForm.controls['password'].value
        }
      }
    };

    this.userService.addUser(user);
 }
}
