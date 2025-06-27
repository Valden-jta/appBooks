import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { User } from '../models/user';
import { ApiAnswer } from '../models/api-answer';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  private url = 'http://localhost:3000';
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  public logged: boolean = false;
  public logged$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {

  
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // LOGIN
  login(user: User): Observable<ApiAnswer> {
    return this.http.post<ApiAnswer>(`${this.url}/login`, user);
  }

  setUser(user: User | null) {
    this.userSubject.next(user);
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

  ngOninit(): void {}
}
