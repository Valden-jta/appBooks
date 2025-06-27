import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/shared/user.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
 public user: User;
 public user$: Observable<User>;
 public nombreCompleto: String;

  constructor(private userService: UserService) { }
showChanges(updatedUser: User) {
  this.user = updatedUser;
  this.nombreCompleto = this.user.name + ' ' + this.user.last_name;
}
  ngOnInit(): void {
      this.user$ = this.userService.user$;
  this.user$.subscribe(user => {
    if (user) {
      this.user = user;
    }
  });
  }
}
