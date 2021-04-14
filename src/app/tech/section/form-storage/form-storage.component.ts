import { Subscription } from 'rxjs';
import { ModelStorageServer } from './../../../models/ModelStorageServer';
import { ServiceStorageService } from './../../../services/service-storage.service';
import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-storage',
  templateUrl: './form-storage.component.html',
  styleUrls: ['./form-storage.component.css']
})
export class FormStorageComponent implements OnInit, OnChanges, OnDestroy {

  storageForm: FormGroup;
  serverId: number;
  storageServer: ModelStorageServer;
  sub: Subscription[] = [];
  isStorages = false;

  constructor(private formBuilder: FormBuilder, private storageService: ServiceStorageService) { }

  receiveServerId(serverIdValue) {
    this.serverId = serverIdValue;
    console.log('receiveServerId' + serverIdValue);
    if (this.serverId > 0) {
      this.isStorages = true;
    }
  }
  receivedStorageServerId (storageServerIdValue) {
    if (storageServerIdValue > 0) {
      this.getStorageServerId(storageServerIdValue);
    } else {
      console.error('storageServerValue é nulo!');
    }
  }

  onSubmitStorage() {
    this.storageServer = this.storageForm.getRawValue();
    this.storageServer.serversId = this.serverId;
    this.sub.push(
      this.storageService.addUpdate(this.storageServer)
      .subscribe(resp => {
        console.log(resp);
      },
      err => {
        alert(err.error);
      },
      () => {
        this.clearForm();
      })
    );
  }

  getStorageServerId(storageServerIdValue) {
    this.sub.push(
      this.storageService.get(storageServerIdValue)
      .subscribe(resp => {
        this.storageServer = resp;
      },
      err => {
        alert(err.error);
      },
      () => {
        this.loadForm();
      })
    );
  }

  clearForm() {
    this.initForm();
  }
  initForm() {
    this.storageForm = this.formBuilder.group({
      storageServerId: [0],
      targetName: [],
      portal: []
    });
  }

  loadForm() {
    this.storageForm = this.formBuilder.group({
      storageServerId: [this.storageServer.storageServerId],
      targetName: [this.storageServer.targetName],
      portal: [this.storageServer.portal]
    });
  }

  ngOnDestroy(): void {
  }
  ngOnChanges(): void {
  }
  ngOnInit() {
    this.initForm();
  }

}
