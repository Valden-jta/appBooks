import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/shared/user.service';
import { ApiAnswer } from '../../models/api-answer';
import { User } from '../../models/user';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css'],
})
export class FormRegisterComponent implements OnInit {
  public formRegister!: FormGroup;
  public newUser: User;

  constructor(
    private formRegisterBuilder: FormBuilder,
    private apiService: UserService,
    private toastr: ToastrService
  ) {
    this.newUser = new User(0, '', '', '', '', '');
    this.buildForm();
  }

  ngOnInit(): void {}

  private buildForm() {
    this.formRegister = this.formRegisterBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      photo: ['', [Validators.required]],
      password: ['', [Validators.required, this.regExpPassword]],
      password2: ['', [Validators.required, this.checkPassword]],
    });
  }

  private regExpPassword(control: AbstractControl) {
    const regexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    if (!regexp.test(control.value)) {
      return { invalidPassword: true };
    }
    return null;
  }

  private checkPassword(control: AbstractControl) {
    if (control.parent?.value.password !== control.value) {
      return { unMatchPassword: true };
      console.log('las contraseñas deben coincidir');
    }
    return null;
  }

  register(user: User) {
    console.log('enviando formulario');
    if (this.formRegister.valid) {
      this.newUser.name = this.formRegister.value.nombre;
      this.newUser.last_name = this.formRegister.value.apellidos;
      this.newUser.email = this.formRegister.value.email;
      this.newUser.photo = this.formRegister.value.photo;
      this.newUser.password = this.formRegister.value.password;
      console.log(this.newUser);
    }

    this.apiService.register(user).subscribe(
      (res: ApiAnswer) => {
        console.log("formulario enviado")
        console.log(res.data);
        this.toastr.success(res?.message || 'Usuario registrado', '', {
          timeOut: 2000,
          positionClass: 'toast-bottom-right',
        });
      },
      (error) => {
        this.toastr.error(error.error?.message || 'Error de conexión', '', {
          timeOut: 2000,
          positionClass: 'toast-bottom-right',
        });
      }
    );
  }

  public onSubmit() {
      this.register(this.newUser);
    }
  
}
