import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Group } from './group';

@Injectable()
export class GroupsService {
  private readonly baseUrl = 'http://localhost:8080/groups';

  constructor(private http: HttpClient) { }

  /**
   * Метод загружает все группы с сервера
   */
  fetchAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseUrl);
  }

}
