import { ListCustomersComponent } from './../components/list-customers/list-customers.component';
import { ListServersComponent } from './../components/list-servers/list-servers.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';

import { TechComponent } from './tech.component';
import { MenuVerticalComponent } from './menu-vertical/menu-vertical.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './section/dashboard/dashboard.component';
import { ServersComponent } from './section/servers/servers.component';
import { CeltaVpnComponent } from './section/celta-vpn/celta-vpn.component';
import { MenuComponent } from './menu/menu.component';
import { FormClienteComponent } from './section/form-cliente/form-cliente.component';
import { FormProdutoComponent } from './section/form-produto/form-produto.component';
import { ListProductsComponent } from '../components/list-products/list-products.component';
import { ListBackupScheduleComponent } from '../components/list-backup-schedule/list-backup-schedule.component';
import { AddCustomerProductsComponent } from '../components/add-customer-products/add-customer-products.component';
import { FormSignsatComponent } from './section/form-signsat/form-signsat.component';
import { BackupscheduleComponent } from './section/servers/backupschedule/backupschedule.component';
import { FormDatabaseComponent } from './section/form-database/form-database.component';
import { FormServerComponent } from './section/form-server/form-server.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TechComponent,
    MenuVerticalComponent,
    HeaderComponent, DashboardComponent, ServersComponent, CeltaVpnComponent, MenuComponent,
    FormClienteComponent,
    FormProdutoComponent,
    ListProductsComponent,
    ListBackupScheduleComponent,
    AddCustomerProductsComponent,
    FormSignsatComponent,
    BackupscheduleComponent,
    FormDatabaseComponent,
    FormServerComponent,
    ListServersComponent,
    ListCustomersComponent
  ]
})
export class TechModule { }
