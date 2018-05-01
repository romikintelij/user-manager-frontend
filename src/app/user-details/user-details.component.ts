import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { FullUserDetails } from '../full-user-details';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GroupsService } from '../groups.service';
import { Group } from '../group';
import { Button } from 'protractor';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  /** user information */
  currentUser: User;

  /** Groups that can be used to bind to a user */
  groups: Group[] = [];

  /** Groups that are now tied to the user */
  userGroups: Group[] = [];

  /** The selected group to add */
  selectedGroup: Group

  userSaved: boolean;

  /** server error */
  serverError: string;

  /**
   * User-selected group
   */
  selectedGroupIndex: number;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private location: Location,
    private groupsService: GroupsService
  ) { }

  ngOnInit() {
    const userId = +this.route.snapshot.paramMap.get('id');

    this.loadUser(userId);
    this.loadUserGroups(userId);
    this.loadAllGroups();
  }

  /**
   * load the user according to the transmitted id from the request
   */
  private loadUser(userId: number) {
    this.usersService.fetchUserById(userId).subscribe(user => this.currentUser = user);
  }

  /**
   * Loads all groups from the server in order to output them in the form
   */
  private loadAllGroups() {
    this.groupsService.fetchAllGroups().subscribe(groups => this.groups = groups);
  }

  /**
   * Loads user groups that are tied to the user
   *
   * @param userId id
   */
  private loadUserGroups(userId: number) {
    this.usersService.fetchUserGroups(userId).subscribe(groups => this.userGroups = groups);
  }

  /**
   * This method is called when the client code tries to display groups of users
   * separated by commas
   */
  get userGroupNames() {
    return this.userGroups.map(group => group.name);
  }

  /**
   * This method returns the selectable groups
   *
   *
   *
   */
  get availableUserGroups() {
    const available = [];

    //Finds the discrepancy between arrays
    for (let group of this.groups) {
      let founded = false;
      for (let userGroup of this.userGroups) {
        if (userGroup.id === group.id) {
          founded = true;
        }
      }
      if (!founded) {
        available.push(group);
      }
    }

    return available;
  }

  /**
   * Adds a user-selected group to its groups
   */
  addSelectedGroup() {
    if (!this.selectedGroup) {
      throw new Error('Required selected group');
    }

    this.userGroups.push(this.selectedGroup);
    this.selectedGroup = undefined;
  }

  /**
   * Deletes a group from the user
   *
   * @param selectedGroup
   */
  deleteGroup(selectedGroup) {
    const indx = this.userGroups.findIndex(group => group.id === selectedGroup.id);
    if (indx !== -1) {
      // group founded
      this.userGroups.splice(indx, 1);
    }
  }

  /**
   * Saves information about the user on the server
   */
  saveUserDetails() {
    this.usersService.saveUser(this.currentUser.id, this.currentUser)
      .subscribe((user) => this.showSuccessFull(user), (err) => this.showError(err));
    // todo: send new groups
  }

  // -----------------------------------------------------------------------------------
  // todo: Notification, I think that it's need move to self component
  // -----------------------------------------------------------------------------------

  private showSuccessFull(user: User) {
    // show that user is persisted
    this.userSaved = true;

    // hide notification
    this.doAfter(() => this.userSaved = undefined, 2.5);
  }

  private showError(err) {
    this.serverError = err.error.message;

    this.doAfter(() => this.serverError = undefined, 2.5);
  }

  private doAfter(fn: () => void, seconds: number) {
    setTimeout(fn, seconds * 1000);
  }

}
