import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloudComponent } from './cloud.component';
import { DashboardCloudComponent } from './dashboard-cloud/dashboard-cloud.component';
import { MenuCloudComponent } from './menu-cloud/menu-cloud.component';
import { MenuCloudVerticalComponent } from './menu-cloud-vertical/menu-cloud-vertical.component';
import { SynchServiceComponent } from './dashboard-cloud/synch-service/synch-service.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    CloudComponent
  ],
  declarations: [
    CloudComponent, 
    DashboardCloudComponent, 
    MenuCloudComponent, MenuCloudVerticalComponent, SynchServiceComponent
  ]
})
export class CloudModule { }
