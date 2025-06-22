import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { User } from '../../models/user';

import { BookService } from 'src/app/shared/book.service';
import { UserService } from 'src/app/shared/user.service';
import { ApiAnswer } from '../../models/api-answer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  public user: User;
  public bookList: Book[];
  public toggleView:boolean

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.user = this.userService.serviceUser;
    this.bookService.books = [];
    this.toggleView = false
  }

  ngOnInit(): void {
    this.reset();
  }
 
  reset(): void {
    this.bookService.getAll(this.user.id_user).subscribe(
      (res: ApiAnswer) => {
        if (Array.isArray(res.data)) this.bookService.books = res.data;
        this.bookList = this.bookService.books;
        console.log('lista importada correctamente');
        console.log(this.bookList);
        this.toastr.success(res.message, '', {
          timeOut: 2000,
          positionClass: 'toast-top-right',
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
