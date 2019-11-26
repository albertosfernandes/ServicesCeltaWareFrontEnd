import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { NavTaskComponent } from './nav-task/nav-task.component';
import { MainTaskComponent } from './main-task/main-task.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TaskComponent, NavTaskComponent, MainTaskComponent]
})
export class TaskModule { }
