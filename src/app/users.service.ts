import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService {
  private readonly usersBaseUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  fetchAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersBaseUrl);
  }

}
