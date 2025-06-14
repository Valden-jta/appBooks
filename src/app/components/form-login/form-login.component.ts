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
export class FormLoginComponent {
  public user: User;
  constructor(
    private apiService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.user = new User(0, '', '', '', '', '');
  }

  iniciarSesion(email: String, password: String) {
    this.apiService.login(this.user).subscribe(
      (res: ApiAnswer) => {
        this.apiService.logged = true;
        this.apiService.serviceUser = res.data as User;
        // TODO: Cambiar navegacion a pagina libros ['/books']
        this.router.navigate(['/profile']);
      },
      (error) => {
        this.toastr.error(error.error?.message || 'Error de conexión', '', {
          timeOut: 2000,
          positionClass: 'toast-bottom-right',
        });
      }
    );
  }

  ngOnInit(): void {}

  onSubmit(loginForm: NgForm) {}
}
