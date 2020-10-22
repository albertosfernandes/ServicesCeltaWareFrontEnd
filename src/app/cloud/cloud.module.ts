import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloudComponent } from './cloud.component';
import { DashboardCloudComponent } from './dashboard-cloud/dashboard-cloud.component';
import { MenuCloudComponent } from './menu-cloud/menu-cloud.component';
import { MenuCloudVerticalComponent } from './menu-cloud-vertical-nao usa/menu-cloud-vertical.component';
import { SynchServiceComponent } from './dashboard-cloud/synch-service/synch-service.component';
import { DatabaseServiceComponent } from './dashboard-cloud/database-service/database-service.component';
import { CertificateA1Component } from './dashboard-cloud/certificate-a1/certificate-a1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CloudComponent
  ],
  declarations: [
    CloudComponent,
    DashboardCloudComponent,
    MenuCloudComponent, MenuCloudVerticalComponent, SynchServiceComponent, DatabaseServiceComponent, CertificateA1Component
  ]
})
export class CloudModule { }
