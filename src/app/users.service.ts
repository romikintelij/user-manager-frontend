import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { FullUserDetails } from './full-user-details';
import { Group } from './group';
import { environment } from '../environments/environment';

@Injectable()
export class UsersService {
  private readonly usersBaseUrl = environment.baseApiUrl + '/users';

  constructor(private http: HttpClient) { }

  /**
   * Loads all users that are in the system
   */
  fetchAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersBaseUrl);
  }

  /**
   * Loads a user by id
   *
   * @param user id to load
   */
  fetchUserById(id: number): Observable<User> {
    this.checkUserId(id);

    return this.http.get<User>(`${this.usersBaseUrl}/${id}`);
  }

  /**
   * Gets a list of user groups to which the user
   *  tied
   *
   * @param group user id
   */
  fetchUserGroups(id: number): Observable<Group[]> {
    this.checkUserId(id);

    return this.http.get<Group[]>(`${this.usersBaseUrl}/${id}/groups`);
  }

  /**
   * The method must store the new user state on the server
   *
   * @param id user which we want to store
   * @param user new data
   */
  saveUser(id: number, user: User): Observable<User> {
    this.checkUserId(id);

    return this.http.put<User>(`${this.usersBaseUrl}/${id}`, user);
  }

  private checkUserId(id: number) {
    if (id < 1) {
      throw new Error('id must be >= 1');
    }
  }
}
