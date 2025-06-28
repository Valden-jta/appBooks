import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Book } from '../../models/book';
import { User } from '../../models/user';

import { BookService } from 'src/app/shared/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit, OnChanges {
  public user: User;
  public toggleView: boolean;
  public filteredBooks: Book[];
  public minPrice: Number;
  public maxPrice: Number;
  public cardsPerPage: Number;
  public currentPage: Number;
  filters = {
    title: '',
    author: '',
    type: '',
    minPrice: 0,
    maxPrice: 100,
  };
  // Comunicación entre componentes
  @Input() userPadre!: User;
  @Input() bookListPadre!: Book[];
  @Output() deleteBook = new EventEmitter<Book>();
  @Output() updateBook = new EventEmitter<Book>();

  constructor(
    private bookService: BookService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.toggleView = false;
    this.filteredBooks = [];
    this.minPrice = 0;
    this.maxPrice = 100;
    this.cardsPerPage = 10;
    this.currentPage = 1;
  }

  ngOnInit(): void {
    this.filteredBooks = this.bookListPadre;
    this.setLimitPrice();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setLimitPrice();
    if (changes['bookListPadre']) {
      this.applyFilters();
    }
  }

  // * Acciones
  delete(book: Book): void {
    this.deleteBook.emit(book);
  }

  update(book: Book): void {
    this.updateBook.emit(book);
  }

  showOne(book: Book): void {
    this.router.navigate(['/book', book.id_book]);
  }

  // * Paginacion
  // Calcula el total de páginas
  get totalPages(): number {
    return Math.ceil(this.filteredBooks.length / Number(this.cardsPerPage));
  }

  // Cambia de página
  setPage(page: number) {
    this.currentPage = page;
  }

  // * Funciones filtrado
  applyFilters() {
    this.filteredBooks = this.bookListPadre.filter(
      (book) =>
        (!this.filters.title ||
          book.title
            .toLowerCase()
            .includes(this.filters.title.toLowerCase())) &&
        (!this.filters.author ||
          book.author
            .toLowerCase()
            .includes(this.filters.author.toLowerCase())) &&
        (!this.filters.type ||
          book.type.toLowerCase().includes(this.filters.type.toLowerCase())) &&
        Number(book.price) >= this.filters.minPrice &&
        Number(book.price) <= this.filters.maxPrice
    );
  }

  setLimitPrice() {
    if (this.bookListPadre && this.bookListPadre.length > 0) {
      this.minPrice = Math.min(
        ...this.bookListPadre.map((book) => Number(book.price) || 0)
      );
      this.maxPrice = Math.max(
        ...this.bookListPadre.map((book) => Number(book.price) || 0)
      );
    } else {
      this.minPrice = 0;
      this.maxPrice = 100;
    }
  }
}
