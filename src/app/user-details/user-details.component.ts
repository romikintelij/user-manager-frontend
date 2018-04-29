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
  /** Информация о пользователе */
  currentUser: User;

  /** Группы которые можно использовать для привязки к пользователю */
  groups: Group[] = [];

  /** Группы которые сейчас привязаны к пользователю */
  userGroups: Group[] = [];

  /** Выбранная группа, для добавления */
  selectedGroup: Group

  userSaved: boolean;

  /** Ошибка с сервера */
  serverError: string;

  /**
   * Выбранная пользователем группа
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
   * Загружаем пользователя по переданному id из запроса
   */
  private loadUser(userId: number) {
    this.usersService.fetchUserById(userId).subscribe(user => this.currentUser = user);
  }

  /**
   * Загружает все группы с сервера для того чтобы в форме их вывести
   */
  private loadAllGroups() {
    this.groupsService.fetchAllGroups().subscribe(groups => this.groups = groups);
  }

  /**
   * Загружает группы пользователя, которые сейчас привязаны к пользователю
   * 
   * @param userId id пользователя
   */
  private loadUserGroups(userId: number) {
    this.usersService.fetchUserGroups(userId).subscribe(groups => this.userGroups = groups);
  }

  /**
   * Этот метод вызывается когда клиентский код пытается вывести группы пользователей
   * через запятую
   */
  get userGroupNames() {
    return this.userGroups.map(group => group.name);
  }

  /**
   * Этот метод возвращает доступные для выбора группы
   * 
   * Эффективность этого метода заставляет желать лучшего
   * todo: переделать, если останется время
   */
  get availableUserGroups() {
    const available = [];

    // Находит расхождение между массивами
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
   * Добавляет выбранную пользователем группу в его группы
   */
  addSelectedGroup() {
    if (!this.selectedGroup) {
      throw new Error('Required selected group');
    }

    this.userGroups.push(this.selectedGroup);
    this.selectedGroup = undefined;
  }

  /**
   * Удаляет группу у пользователя
   * 
   * @param selectedGroup выбранная группа
   */
  deleteGroup(selectedGroup) {
    const indx = this.userGroups.findIndex(group => group.id === selectedGroup.id);
    if (indx !== -1) {
      // group founded
      this.userGroups.splice(indx, 1);
    }
  }

  /**
   * Сохраняет информацию о пользователе на сервере
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
