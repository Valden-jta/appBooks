import { Component, AfterViewInit } from '@angular/core';

import { User } from '../../models/user';
import { UserService } from 'src/app/shared/user.service';

declare var bootstrap: any;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements AfterViewInit {
   public user: User;
   public nombreCompleto: String;

   constructor(
       private userService: UserService,
     ) {
     this.user = this.userService.serviceUser
     this.nombreCompleto = this.user.name + ' ' + this.user.last_name;
    }

    ngAfterViewInit() {
    const myOffcanvas = new bootstrap.Offcanvas('#asideMenu');
    myOffcanvas.show();
  }
}
