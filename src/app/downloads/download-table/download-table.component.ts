import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DownloadsService } from '../downloads.service';

@Component({
  selector: 'app-download-table',
  templateUrl: './download-table.component.html',
  styleUrls: ['./download-table.component.css']
})
export class DownloadTableComponent implements OnInit, OnChanges {

  _filesDownload: any[] = [];
  @Input() filterCategory: string;
  
  constructor(private downloadService: DownloadsService) { }

  ngOnInit() {
    //this._filesDownload = this.downloadService.getFilesDownload(this.filterCategory);        
  }

  ngOnChanges(){
    this._filesDownload = this.downloadService.getFilesDownload(this.filterCategory);
  }

}
