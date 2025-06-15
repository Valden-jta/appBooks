import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/shared/user.service';
import { ApiAnswer } from '../../models/api-answer';
import { User } from '../../models/user';

@Component({
  selector: 'app-form-profile',
  templateUrl: './form-profile.component.html',
  styleUrls: ['./form-profile.component.css'],
})
export class FormProfileComponent implements OnInit {
  public user: User;
  public editedUser: User;
  public passwordPattern;
  public newName: string;
  public newLast_name: string;
  public newEmail: string;
  public newPhoto: string;
  public newPassword: string;
  public newPasswordCheck: string;
  public confirmPassword: string;

  constructor(private apiService: UserService, private toastr: ToastrService) {
    this.user = this.apiService.serviceUser;
    this.passwordPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$';
    this.editedUser = new User(this.user.id_user, '', '', '', '', '');
    this.newName = '';
    this.newLast_name = '';
    this.newEmail = '';
    this.newPhoto = '';
    this.newPassword;
    this.newPasswordCheck = '';
    this.confirmPassword = '';
  }

  ngOnInit(): void {
    console.log(this.user);
  }

 private editUser(user, editedUser): any {
  // Rellenar los campos vacíos de editedUser con la información existente de user
  Object.entries(editedUser).forEach(([attr, value]) => {
    if (value === '' || undefined) {
      editedUser[attr] = user[attr];
    }
  });
  // Construir y devolver el objeto final
  return {
    ...editedUser,
    confirmPassword: this.confirmPassword,
  };
}

  onSubmit(form: NgForm) {
    this.editedUser = new User(
      this.user.id_user,
      this.newName,
      this.newLast_name,
      this.newEmail,
      this.newPhoto,
      this.newPassword || ''
    );
    let editedObject = this.editUser(this.user, this.editedUser);
    console.log(editedObject);
    this.apiService.edit(editedObject).subscribe(
      (res: ApiAnswer) => {
        console.log('datos enviado');
        console.log(res.data);
        this.toastr.success(res?.message || 'Usuario actualizado', '', {
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
}
