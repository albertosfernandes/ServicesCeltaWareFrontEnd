import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RoutingModule } from './routing.module';
import { HomeModule } from './home/home.module';
import { DownloadsModule } from './downloads/downloads.module';
import { TechModule } from './tech/tech.module';
import { TaskModule } from './task/task.module';
import { CloudModule } from './cloud/cloud.module';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
  BrowserModule,
    RoutingModule,
    HomeModule,
    DownloadsModule,
    TechModule,
    TaskModule,
    CloudModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
