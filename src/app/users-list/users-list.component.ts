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
   * Loads users to a page for further display
   */
  private loadUsersFromServer() {
    this.usersService.fetchAllUsers()
      .subscribe(users => this.allUsers = users);
  }
}
