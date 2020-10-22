import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';
import { ModelServer } from './../../../models/model-server';
import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor(private serversService: ServersService) { }

  servers: ModelServer[];
  myServer: ModelServer;
  isShowScheduleBackup = false;

  loadServers() {
    this.serversService.getServersAll()
    .subscribe(dataserver => {
      this.servers = dataserver;
    },
    error => {
      alert('Falha ao carregar servidores');
    });
  }

  loadBackupSchedule(_server: ModelServer) {
    this.myServer = _server;
    console.log('loadBackupSchedule' + this.myServer.serversId);
    this.isShowScheduleBackup = !this.isShowScheduleBackup;
  }

  ngOnInit() {
    this.loadServers();
  }

}
