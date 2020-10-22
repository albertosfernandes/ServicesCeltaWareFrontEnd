import { ModelServer } from './../../models/model-server';
import { ServersService } from './../../tech/section/servers/servers.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-servers',
  templateUrl: './list-servers.component.html',
  styleUrls: ['./list-servers.component.css']
})
export class ListServersComponent implements OnInit {

  servers: ModelServer[] = [];
  isLoading = true;
  isActive: any = '';
  @Output() eventServerId = new EventEmitter();
  constructor(private serversService: ServersService) { }

  loadServers() {
    this.serversService.getServersAll()
    .subscribe(dataServers => {
      this.servers = dataServers;
    },
    error => {
    alert('Erro ao carregar Servidores');
    },
    () => {
      this.isLoading = false;
    });
  }

  onChange(serverId) {
    this.eventServerId.emit(serverId);
    this.isActive = serverId;
    console.log('serverid= ' + serverId);
  }

  ngOnInit() {
    this.loadServers();
  }

}
