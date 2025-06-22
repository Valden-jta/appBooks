import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Book } from '../../models/book';
import { User } from '../../models/user';

import { BookService } from 'src/app/shared/book.service';
import { UserService } from 'src/app/shared/user.service';



@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent {
  public user:User
    // Comunicación entre componentes  
  @Input() userPadre!: User;
  @Input() bookListPadre!: Book[];
  @Input() addedBook!: Book;
  @Output() deleteBook = new EventEmitter<Book>();

  constructor(private bookService: BookService ) {
    
  }


  ngOnInit(): void {}
}
