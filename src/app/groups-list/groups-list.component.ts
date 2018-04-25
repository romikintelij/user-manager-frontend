import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../groups.service';
import { Group } from '../group';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {
  // default value is empty array because we can get error about undefined property 'length'
  groups: Group[] = [];

  constructor(private groupsService: GroupsService) { }

  ngOnInit() {
    this.loadAllGroups();
  }

  /**
   * Загружает все группы с сервера для отображения
   */
  private loadAllGroups() {
    this.groupsService.fetchAllGroups()
      .subscribe(groups => this.groups = groups);
  }

}
