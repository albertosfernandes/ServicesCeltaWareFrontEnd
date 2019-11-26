import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechComponent } from './tech.component';
import { MenuVerticalComponent } from './menu-vertical/menu-vertical.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './section/dashboard/dashboard.component';
import { ServersComponent } from './section/servers/servers.component';
import { CeltaVpnComponent } from './section/celta-vpn/celta-vpn.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TechComponent, 
    MenuVerticalComponent, 
    HeaderComponent, DashboardComponent, ServersComponent, CeltaVpnComponent
  ]
})
export class TechModule { }
