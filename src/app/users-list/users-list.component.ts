import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  allUsers: User[] = [];

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUsersFromServer();
  }

  /**
   * Загружает пользователей на страницу для дальнейшего их отображения
   */
  private loadUsersFromServer() {
    this.usersService.fetchAllUsers()
      .subscribe(users => this.allUsers = users);
  }
}
