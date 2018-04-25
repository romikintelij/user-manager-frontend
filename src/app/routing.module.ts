import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLinkActive } from '@angular/router'
import { UsersListComponent } from './users-list/users-list.component';
import { GroupsListComponent } from './groups-list/groups-list.component';

const routes: Routes = [
  {path: 'users', component: UsersListComponent},
  {path: 'groups', component: GroupsListComponent},
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
