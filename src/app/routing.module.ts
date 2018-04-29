import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLinkActive } from '@angular/router'
import { UsersListComponent } from './users-list/users-list.component';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersInGroupComponent } from './users-in-group/users-in-group.component';

const routes: Routes = [
  {path: 'users', component: UsersListComponent},
  {path: 'groups', component: GroupsListComponent},
  {path: 'users/:id', component: UserDetailsComponent},
  {path: 'groups/:id/users', component: UsersInGroupComponent},
  // root route
  {path: '', pathMatch: 'full', redirectTo: 'users'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule, RouterLinkActive]
})
export class RoutingModule { }
