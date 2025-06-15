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

  constructor(private apiService: UserService) {
    this.user = apiService.serviceUser;
  }

  ngOnInit(): void {
  }
}
