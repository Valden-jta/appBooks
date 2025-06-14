import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { ApiAnswer } from '../models/api-answer';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000'; 
  public user: User;

  constructor(private http: HttpClient) {
    this.user = null;
  }
  // LOGIN
  getUser(): Observable<ApiAnswer> {
    return this.http.get<ApiAnswer>(`${this.url}/login`);
  }
  // REGISTER
  postUser(newUser: User): Observable<ApiAnswer>{
    return this.http.post<ApiAnswer>(`${this.url}/register`, newUser);
  }
  // PROFILE
  putUser(editedUser: User): Observable<ApiAnswer> {
    return this.http.put<ApiAnswer>(`${this.url}/usuarios`, editedUser);
  }


  ngOninit(): void {}
}

