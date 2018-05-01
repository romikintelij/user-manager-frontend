import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../group';
import { User } from '../user';
import { GroupsService } from '../groups.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-in-group',
  templateUrl: './users-in-group.component.html',
  styleUrls: ['./users-in-group.component.css']
})
export class UsersInGroupComponent implements OnInit {
  group: Group;
  users: User[];

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupsService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    const groupId = +this.route.snapshot.paramMap.get('id');

    this.loadGroup(groupId);
    this.loadUsersInGroup(groupId);
  }

  /**
   * Load the group that is browsed
   *
   * @param group id which is browsed
   */
  private loadGroup(id: number) {
    this.groupService.fetchById(id).subscribe(group => this.group = group);
  }

  /**
   *Loads users into a group
   *
   * @param group id
   */
  private loadUsersInGroup(id: number) {
    this.groupService.fetchUsersInGroup(id).subscribe(users => this.users = users);
  }

}
