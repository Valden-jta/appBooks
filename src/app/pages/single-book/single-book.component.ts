import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { User } from 'src/app/models/user';
import { Book } from 'src/app/models/book';
import { ApiAnswer } from 'src/app/models/api-answer';

import { BookService } from 'src/app/shared/book.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {
  public book?: Book;
  public user: User;

    constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.user = this.userService.serviceUser
  }

  ngOnInit(): void {
    let id_user = this.user.id_user;
    let id_book = this.route.snapshot.paramMap.get('id_book');
    console.log("id_user: ", id_user)
    console.log("id_book: ", id_book);
    if (id_user && id_book) {
      this.bookService.getOne(id_user, parseInt(id_book)).subscribe(
        (res: ApiAnswer<Book>) => { 
            this.book = res.data[0];
            console.log(this.book);
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
}
