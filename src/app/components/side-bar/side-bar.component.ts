import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../models/user';
import { UserService } from 'src/app/shared/user.service';

declare var bootstrap: any;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  public user: User;
  public user$: Observable<User>;
  public nombreCompleto: String;

  constructor(private userService: UserService) {
    this.user$ = this.userService.user$;
    this.nombreCompleto = '';
  }

  ngOnInit(): void {
    this.user$ = this.userService.user$;
    this.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }
}
