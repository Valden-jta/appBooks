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
  public user$ = this.userService.user$;
  public logged$ = this.userService.logged$;

  constructor(private userService: UserService,  private router: Router) {
    
  }

  ngOnInit(): void {
  }

  logOut(value:boolean) {
    this.userService.onLogin(false);
    this.router.navigate(['/home']);
  }
}
