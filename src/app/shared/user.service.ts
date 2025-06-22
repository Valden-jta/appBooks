import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { User } from '../models/user';
import { ApiAnswer } from '../models/api-answer';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:3000';
  // public logged: boolean = false;
  public serviceUser: User | null;
  public  logged$ = new BehaviorSubject<boolean>(true)

  constructor(private http: HttpClient) {
    this.serviceUser = null;
  }

  // LOGIN
  login(user: User): Observable<ApiAnswer> {
    return this.http.post<ApiAnswer>(`${this.url}/login`, user);
  }

  onLogin(value: boolean) {
  this.logged$.next(value);
}
  // REGISTER
  register(newUser: User): Observable<ApiAnswer> {
    return this.http.post<ApiAnswer>(`${this.url}/register`, newUser);
  }
  // PROFILE
  edit(editedObject: any): Observable<ApiAnswer> {
    return this.http.put<ApiAnswer>(`${this.url}/usuarios`, editedObject);
  }

  

  ngOninit(): void {
  }
}
