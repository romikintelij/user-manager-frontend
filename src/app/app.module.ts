import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersService } from './users.service';
import { RoutingModule } from './routing.module';
import { GroupsService } from './groups.service';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersListViewComponent } from './users-list-view/users-list-view.component';
import { UsersInGroupComponent } from './users-in-group/users-in-group.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    GroupsListComponent,
    UserDetailsComponent,
    UsersListViewComponent,
    UsersInGroupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    FormsModule
  ],
  providers: [UsersService, GroupsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
