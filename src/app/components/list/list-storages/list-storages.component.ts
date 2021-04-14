import { Subscription } from 'rxjs';
import { ServiceStorageService } from './../../../services/service-storage.service';
import { ModelStorageServer } from './../../../models/ModelStorageServer';
import { Component, EventEmitter, OnInit, Output, OnChanges, OnDestroy, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-list-storages',
  templateUrl: './list-storages.component.html',
  styleUrls: ['./list-storages.component.css']
})
export class ListStoragesComponent implements OnInit, OnChanges, OnDestroy {

  storages: ModelStorageServer[] = [];
  isLoading = true;
  isActive: any = '';
  @Output() eventStorageId = new EventEmitter();
  @Input() serverId;
  sub: Subscription[] = [];

  constructor(private storageService: ServiceStorageService) { }

  loadStoragesByServerId () {
    console.log('loadStoragesByServerId' + this.serverId);
    this.sub.push(
      this.storageService.getStorages(this.serverId)
      .subscribe(resp => {
        this.storages = resp;
      },
      err => {
        alert(err.error);
      },
      () => {
        this.isLoading = false;
      })
    );
  }

  onChange(changeStorageServerId) {
    this.eventStorageId.emit(changeStorageServerId);
  }

  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe());
  }
  ngOnChanges(): void {
    this.loadStoragesByServerId();
  }
  ngOnInit() {
    this.loadStoragesByServerId();
  }

}
