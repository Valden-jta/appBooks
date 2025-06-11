import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {
  public user: User;

constructor() { 
  this.user = new User(0,'','','','','');
};

ngOnInit(): void {}

onSubmit(loginForm: NgForm) {
 console.log(loginForm.value);
 console.log(this.user);
}

}
