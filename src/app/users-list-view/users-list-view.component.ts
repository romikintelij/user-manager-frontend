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
   * Makes a redirect to the user's view page by id
   *
   * @param userId
   */
  redirectToShowPage(userId: number) {
    this.router.navigateByUrl(`/users/${userId}`);
  }

}
