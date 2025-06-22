import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';
import { BookService } from 'src/app/shared/book.service';
import { ApiAnswer } from 'src/app/models/api-answer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  public bookList = {};

  constructor(private userService: UserService,private booksS) {}

  ngOnInit(): void {}
}
