import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import { ApiAnswer } from '../../models/api-answer';
import { User } from '../../models/user';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css'],
})
export class FormLoginComponent implements OnInit {
  public user: User;
  public showPassword: Boolean;
  public logged$ = this.userService.logged$;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.user = new User(0, '', '', '', '', '');
    this.showPassword = false;
  }

  iniciarSesion(email: String, password: String) {
    this.userService.login(this.user).subscribe(
      (res: ApiAnswer<User>) => {
        this.userService.onLogin(true);
        console.log(this.logged$);

        if (res.data) {
           this.userService.setUser(new User(
          res.data.id_user,
          res.data.name,
          res.data.last_name,
          res.data.email,
          res.data.photo,
          ''
        ));
        }
        this.router.navigate(['/books']);
      },
      (error) => {
        this.toastr.error(error.error?.message || 'Error de conexión', '', {
          timeOut: 2000,
          positionClass: 'toast-bottom-right',
        });
      }
    );
  }

  passwortdToast() {
    this.toastr.success('Se ha enviado un correo de recuperacion', '', {
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(loginForm: NgForm) {
    
  }
}
