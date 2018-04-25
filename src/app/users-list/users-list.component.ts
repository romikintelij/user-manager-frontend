import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  // Пользователь которого мы выбрали в списке
  selectedUserId: number;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.loadUsersFromServer();
  }

  /**
   * Загружает пользователей на страницу для дальнейшего их отображения
   */
  private loadUsersFromServer() {
    this.usersService.fetchAllUsers()
      .subscribe(users => this.users = users);
  }

  /**
   * Данная функция выбирает конкретного пользователя из списка и показывает
   * подробную информацию по нему в новом компоненте
   */
  showDetails(id: number) {
    this.selectedUserId = id;
  }

}
