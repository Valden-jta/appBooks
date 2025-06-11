import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import  { User } from '../../models/user';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css'],
})
export class FormRegisterComponent implements OnInit {

  public formRegister!: FormGroup;
  public newUser: User;
  
  constructor(private formRegisterBuilder: FormBuilder) {
    this.newUser = new User(0,'','','','','');
    this.buildForm();
  }

  ngOnInit(): void {}

  
private buildForm() {
    this.formRegister = this.formRegisterBuilder.group({
      nombre: ['',[Validators.required]],
      apellidos: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['',[Validators.required]],
      password: ['', [Validators.required, this.regExpPassword]],
      password2:['',[Validators.required, this.checkPassword]],
    });
    
}

  private regExpPassword(control: AbstractControl) {
    const regexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    if(!regexp.test(control.value)) {
      return {invalidPassword: true}
    }
    return null;
  }

  private checkPassword(control: AbstractControl) {
    if (control.parent?.value.password !== control.value) {
      return {unMatchPassword: true}
    } 
    return null;
  }

  public onSubmit() {
    console.log('enviando formulario');
    if (this.formRegister.valid) {
      this.newUser.name = this.formRegister.value.nombre;
      this.newUser.last_name = this.formRegister.value.apellidos;
      this.newUser.email = this.formRegister.value.email;
      this.newUser.password = this.formRegister.value.password;
      console.log(this.newUser);
    } else {
      console.log('Formulario inválido');
    }
  }
}

