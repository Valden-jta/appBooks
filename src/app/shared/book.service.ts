import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Book } from '../models/book';
import { ApiAnswer } from '../models/api-answer';

@Injectable({
  providedIn: 'root'
})
export class BookService implements OnInit {

  public books: Book[] | null;
  private url = "https://api-books-blond.vercel.app/books"

  constructor(private http: HttpClient) { 
    this.books = null;
  }

  getAll(id_user: number): Observable<ApiAnswer> {
    return this.http.get<ApiAnswer>(`${this.url}?id_user=${id_user}`);
  }
  getOne(id_user:number, id_book:number): Observable<ApiAnswer> {
    return this.http.get<ApiAnswer>(`${this.url}?id_user=${id_user}&id_book=${id_book}`);
  }

  add(newBook: Book):Observable<ApiAnswer> {
    return this.http.post<ApiAnswer>(this.url, newBook);
  }

  edit(editedBook:Book): Observable<ApiAnswer> {
    console.log(editedBook);
    return this.http.put<ApiAnswer>(this.url, editedBook);
  }

  delete(deletedBook:Book): Observable<ApiAnswer> {
    return this.http.delete<ApiAnswer>(this.url,{body: deletedBook});
  }

  ngOnInit(): void {
      
  }
}
