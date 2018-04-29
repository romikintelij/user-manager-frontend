import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list-view',
  templateUrl: './users-list-view.component.html',
  styleUrls: ['./users-list-view.component.css']
})
export class UsersListViewComponent implements OnInit {

  @Input() users: User[];
  @Input() headerEnabled: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.headerEnabled === undefined) {
      this.headerEnabled = true;
    }
  }

  /**
   * Делает редирект на страницу просмотра пользователя по id
   * 
   * @param userId id пользователя которого выбрал пользователь для просмотра
   */
  redirectToShowPage(userId: number) {
    this.router.navigateByUrl(`/users/${userId}`);
  }

}
