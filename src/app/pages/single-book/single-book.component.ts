import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user';
import { Book } from 'src/app/models/book';
import { ApiAnswer } from 'src/app/models/api-answer';
import { PutDeleteResult } from 'src/app/models/interface-results';

import { BookService } from 'src/app/shared/book.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css'],
})
export class SingleBookComponent implements OnInit {
  public book?: Book;
  public books: Book[];
   public user$: Observable<User>;
   public user: User;
  public formBook!: FormGroup;
  public types: String[] = ['Tapa Blanda', 'Tapa Dura'];

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.user$ = this.userService.user$;
    this.books = this.bookService.books;
    this.buildForm();
  }

ngOnInit(): void {
  this.user$.subscribe(user => {
    if (!user) return;
    this.user = user;
    let id_user = user.id_user;
    let id_book = this.route.snapshot.paramMap.get('id_book');
    if (id_user && id_book) {
      this.bookService.getOne(id_user, parseInt(id_book)).subscribe(
        (res: ApiAnswer<Book>) => {
          this.book = res.data[0];
        },
        (error) => {
          this.toastr.error(error.error?.message || 'Error de conexión', '', {
            timeOut: 2000,
            positionClass: 'toast-bottom-right',
          });
        }
      );
    }
  });
}

  deleteBook(book: Book) {
    alert('Vas a eliminar este libro');
    this.bookService.delete(book).subscribe(
      (res: ApiAnswer<PutDeleteResult>) => {
        if (res.data.affectedRows) {
          console.log(res.data);
          this.toastr.success(res.message, '', {
            timeOut: 2000,
            positionClass: 'toast-top-right',
          });
          this.router.navigate(['/books']);
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

  updateBook(book: Book) {
    this.bookService.edit(book).subscribe(
      (res: ApiAnswer<PutDeleteResult>) => {
        if (res.data.affectedRows) {
           this.book = { ...this.book, ...book };
          console.log(res.data);
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
    if (!this.book) return;
    let id_book = this.book.id_book;
    let id_user = this.user.id_user;
    let title = this.formBook.get('title')?.value || this.book.title;
    let type = this.formBook.get('type')?.value || this.book.type;
    let author = this.formBook.get('author')?.value || this.book.author;
    let photo = this.formBook.get('photo')?.value || this.book.photo;
    let price = this.formBook.get('price')?.value || this.book.price;

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
}
