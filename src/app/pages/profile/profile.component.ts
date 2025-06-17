import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/shared/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
 public user: User;
 public nombreCompleto: String;

  constructor(private apiService: UserService) {
    this.user = this.apiService.serviceUser;
    this.nombreCompleto = this.user.name + ' ' + this.user.last_name;
  }
showChanges(updatedUser: User) {
  this.user = updatedUser;
  this.nombreCompleto = this.user.name + ' ' + this.user.last_name;
}
  ngOnInit(): void {
  }
}
