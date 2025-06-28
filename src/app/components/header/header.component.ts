import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public user: User;
  public user$ = this.userService.user$;
  public logged$ = this.userService.logged$;

  constructor(private userService: UserService, private router: Router) {
    this.user$ = this.userService.user$;
  }

  ngOnInit(): void {
    this.user$ = this.userService.user$;
    this.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  logOut(value: boolean) {
    this.userService.onLogin(false);
    this.router.navigate(['/home']);
  }
}
