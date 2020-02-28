import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TechComponent } from './tech.component';
import { MenuVerticalComponent } from './menu-vertical/menu-vertical.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './section/dashboard/dashboard.component';
import { ServersComponent } from './section/servers/servers.component';
import { CeltaVpnComponent } from './section/celta-vpn/celta-vpn.component';
import { MenuComponent } from './menu/menu.component';
import { FormClienteComponent } from './section/form-cliente/form-cliente.component';
import { FormProdutoComponent } from './section/form-produto/form-produto.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TechComponent,
    MenuVerticalComponent,
    HeaderComponent, DashboardComponent, ServersComponent, CeltaVpnComponent, MenuComponent, FormClienteComponent, FormProdutoComponent
  ]
})
export class TechModule { }
