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
   * Загружает всех пользователей что есть в системе
   */
  fetchAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersBaseUrl);
  }

  /**
   * Загружает пользователя по id
   * 
   * @param id пользователя которого нужно загрузить
   */
  fetchUserById(id: number): Observable<User> {
    this.checkUserId(id);

    return this.http.get<User>(`${this.usersBaseUrl}/${id}`);
  }

  /**
   * Получает список групп пользователя к которым пользователь
   * сейчас привязан
   * 
   * @param id пользователя для загрузки групп
   */
  fetchUserGroups(id: number): Observable<Group[]> {
    this.checkUserId(id);

    return this.http.get<Group[]>(`${this.usersBaseUrl}/${id}/groups`);
  }

  /**
   * Метод должен сохранить новое состояние пользователя на сервере
   * 
   * @param id пользователя которого мы хотим сохранить
   * @param user новые данные
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
