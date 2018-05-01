import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Group } from './group';
import { environment } from '../environments/environment';
import { Observer } from 'rxjs/Observer';
import { User } from './user';

@Injectable()
export class GroupsService {
  private readonly baseUrl = environment.baseApiUrl + '/groups';

  constructor(private http: HttpClient) { }

  /**
   * The method loads all groups from the server
   */
  fetchAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseUrl);
  }

  /**
   * Loads the group view by id
   *
   * @param id of the group you want to load
   */
  fetchById(id: number): Observable<Group> {
    return this.http.get<Group>(`${this.baseUrl}/${id}`);
  }

  /**
   * Loads all users who are in a group
   *
   * @param id group
   */
  fetchUsersInGroup(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/${id}/users`);
  }

}
