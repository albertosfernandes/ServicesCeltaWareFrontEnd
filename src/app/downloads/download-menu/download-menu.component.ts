import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DownloadsService } from '../downloads.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-download-menu',
  templateUrl: './download-menu.component.html',
  styleUrls: ['./download-menu.component.css']
})
export class DownloadMenuComponent implements OnInit, OnDestroy {
  
  
  categories: any[] = [];
  active: string;
  activated: string;
  isActive: boolean = false;
  isMouseOver: boolean = false;
  constructor(private downloadService: DownloadsService) { }
  
  @Output() onClickFilter = new EventEmitter<string>();
  emissor: Subject<string> = new Subject<string>();
  toactivate(_value: string) {
    this.activated = _value;
    this.isActive = !this.isActive;
    console.log('Clique componente menu filho: '+_value);
    this.onClickFilter.emit(_value);
  }
  onMouseOverOut(_value: string) {
    this.isMouseOver = !this.isMouseOver;
    this.active = _value;
  }
  ngOnInit() {
    this.categories = this.downloadService.getDirectoryDownload();
    this.emissor.subscribe(_value => console.log('Subscribe: '+_value)); 
  }

  ngOnDestroy(): void {
    this.emissor.unsubscribe();    
  }
  
}
