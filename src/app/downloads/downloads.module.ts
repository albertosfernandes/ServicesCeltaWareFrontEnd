import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DownloadsComponent } from './downloads.component';
import { DownloadTableComponent } from './download-table/download-table.component';
import { DownloadMenuComponent } from './download-menu/download-menu.component';
import { DownloadNewcategoryComponent } from './download-newcategory/download-newcategory.component';
import { DownloadUploadComponent } from './download-upload/download-upload.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    DownloadsComponent
  ],
  declarations: [
    DownloadsComponent, 
    DownloadTableComponent, 
    DownloadMenuComponent, 
    DownloadNewcategoryComponent, 
    DownloadUploadComponent
  ]
})
export class DownloadsModule { }
