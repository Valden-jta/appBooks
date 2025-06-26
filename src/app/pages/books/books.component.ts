import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../../models/book';
import { User } from '../../models/user';
import { ApiAnswer } from '../../models/api-answer';
import { PutDeleteResult } from 'src/app/models/interface-results';

import { BookService } from 'src/app/shared/book.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  public user: User;
  public selectedBook: Book | null;
  public bookList: Book[];
  
  public formBook!: FormGroup;
  public types: String[] = ['Tapa Blanda', 'Tapa Dura'];

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.user = this.userService.serviceUser;
    this.bookList = [];
    this.bookService.books = [];
    this.selectedBook = null;
    this.buildForm();
  }

  ngOnInit(): void {
    console.log('Usuario');
    console.log(this.user);
    this.reset();
  }

  scroll(sectionId: string): void {
    let element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // * Eliminar libro (viene del componente)

  deleteBook(book: Book) {
    this.bookService.delete(book).subscribe(
      (res: ApiAnswer<PutDeleteResult>) => {
        if (res.data.affectedRows) {
          console.log(res.data);
          this.reset();
          this.toastr.success(res.message, '', {
            timeOut: 2000,
            positionClass: 'toast-top-right',
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

  // * Actualizar libro (viene del componente)
  selectBook(book: Book) {
    this.selectedBook = book;
  }

  updateBook(book: Book) {
    console.log('selectedBook: ', this.selectedBook);
    this.bookService.edit(book).subscribe(
      (res: ApiAnswer<PutDeleteResult>) => {
        if (res.data.affectedRows) {
          console.log(res.data);
          this.reset();
          this.toastr.success(res.message, '', {
            timeOut: 2000,
            positionClass: 'toast-top-right',
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
  //  constructor del formulario
  private buildForm() {
    this.formBook = this.formBuilder.group({
      title: ['', ''],
      author: ['', ''],
      photo: ['', ''],
      type: ['', ''],
      price: ['', ''],
    });
  }

  public onSubmit() {
    if (!this.selectedBook) return;
    let id_book = this.selectedBook.id_book;
    let id_user = this.user.id_user;
    let title = this.formBook.get('title')?.value || this.selectedBook.title;
    let type = this.formBook.get('type')?.value || this.selectedBook.type;
    let author = this.formBook.get('author')?.value || this.selectedBook.author;
    let photo = this.formBook.get('photo')?.value || this.selectedBook.photo;
    let price = this.formBook.get('price')?.value || this.selectedBook.price;

    let updatedBook = new Book(
      id_book,
      id_user,
      title,
      type,
      author,
      price,
      photo
    );
    this.updateBook(updatedBook);
  }


  reset(): void {
    this.bookService.getAll(this.user.id_user).subscribe(
      (res: ApiAnswer<Book[]>) => {
        this.bookService.books = res.data;
        this.bookList = this.bookService.books;
        console.log('lista importada correctamente');
        console.log(this.bookList);
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
