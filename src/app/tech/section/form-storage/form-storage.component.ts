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

  constructor(private formBuilder: FormBuilder, private storageService: ServiceStorageService) { }

  receiveServerId(serverIdValue) {
    this.serverId = serverIdValue;
    console.log('receiveServerId' + serverIdValue);
  }

  onSubmitStorage() {
    this.storageServer = this.storageForm.getRawValue();
    this.storageServer.ServersId = this.serverId;
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

  clearForm() {
    // limprar!!
  }
  initForm() {
    this.storageForm = this.formBuilder.group({
      storageServerId: [0],
      targetName: [],
      portal: []
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
