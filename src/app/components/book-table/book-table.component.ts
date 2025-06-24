import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Book } from '../../models/book';
import { User } from '../../models/user';

import { BookService } from 'src/app/shared/book.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.css'],
})
export class BookTableComponent {
  public user: User;
  // Comunicación entre componentes
  @Input() userPadre!: User;
  @Input() bookListPadre!: Book[];
  @Output() deleteBook = new EventEmitter<Book>();
  @Output() updateBook = new EventEmitter<Book>();

  constructor(private bookService: BookService) {}

  ngOnInit(): void {}

  delete(book: Book): void {
    this.deleteBook.emit(book);
  }

  update(book: Book):void {
    this.updateBook.emit(book);
  }
}
