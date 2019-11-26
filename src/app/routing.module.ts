import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DownloadsComponent } from './downloads/downloads.component';
import { TechComponent } from './tech/tech.component';
import { TaskComponent } from './task/task.component';
import { CloudComponent } from './cloud/cloud.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const asfRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'downloads', component: DownloadsComponent },
  { path: 'cloud', component: CloudComponent },
  { path: 'tech', component: TechComponent },
  { path: 'task', component: TaskComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [    
    CommonModule,
    RouterModule.forRoot(asfRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
