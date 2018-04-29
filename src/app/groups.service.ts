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
   * Метод загружает все группы с сервера
   */
  fetchAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseUrl);
  }

  /**
   * Загружает представление группы по id
   * 
   * @param id группы которую надо загрузить
   */
  fetchById(id: number): Observable<Group> {
    return this.http.get<Group>(`${this.baseUrl}/${id}`);
  }

  /**
   * Загружает всех пользователей который находятся в группе
   * 
   * @param id группы
   */
  fetchUsersInGroup(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/${id}/users`);
  }

}
