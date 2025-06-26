import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Book } from 'src/app/models/book';
import { User } from 'src/app/models/user';
import { ApiAnswer } from 'src/app/models/api-answer';

import { BookService } from 'src/app/shared/book.service';
import { UserService } from 'src/app/shared/user.service';
import { PostResult } from 'src/app/models/interface-results';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  public user: User;
  public books: Book[] = [];
  public book!: Book;
  public addedBook!: Book;
  public formBook!: FormGroup;
  public types: String[] = ['Tapa Blanda', 'Tapa Dura'];

  constructor(
    private formBuilder: FormBuilder,
    public bookService: BookService,
    public userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.buildForm();
    this.addedBook = null;
  }

  private buildForm() {
    this.formBook = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      photo: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.books = this.bookService.books;
    this.user = this.userService.serviceUser;
    console.log('lista importada correctamente');
    console.log(this.books);
    console.log('Usuario');
    console.log(this.user);
    console.log('addedBook');
    console.log(this.addedBook);
  }

  public onSubmit() {
    let id_user = this.user.id_user;
    let title = this.formBook.get('title')?.value;
    let type = this.formBook.get('type')?.value;
    let author = this.formBook.get('author')?.value;
    let photo = this.formBook.get('photo')?.value;
    let price = this.formBook.get('price')?.value;

    let newBook = new Book(null, id_user, title, type, author, price, photo);

    this.bookService.add(newBook).subscribe(
      (res: ApiAnswer<PostResult>) => {
        let data = res.data;
        if (data.result.insertId) {
          this.addedBook = data.newBook;
          this.toastr.success(res.message, '', {
            timeOut: 2000,
            positionClass: 'toast-bottom-right',
          });
        }
      },
      (error) => {
        this.toastr.error(error.error?.message || 'Error de conexión', '', {
          timeOut: 2000,
          positionClass: 'toast-bottom-right',
        });
      }
    );
  }

  targetBook(id: number): void {
    this.router.navigate(['/books']).then(() => {
      setTimeout(() => {
        let card = document.querySelector('#card_' + id);
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    });
  }
}
