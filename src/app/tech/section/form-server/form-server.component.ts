import { ModelServer } from './../../../models/model-server';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ServersService } from '../servers/servers.service';

@Component({
  selector: 'app-form-server',
  templateUrl: './form-server.component.html',
  styleUrls: ['./form-server.component.css']
})
export class FormServerComponent implements OnInit, OnChanges {

  serverForm: FormGroup;
  server: ModelServer;
  servers: ModelServer[] = [];

  constructor(private formBuilder: FormBuilder, private serverService: ServersService) { }

  onSubmitServer() {
    this.server = this.serverForm.getRawValue();
    this.serverService.addServer(this.server)
    .subscribe(data => {

    },
    error => {
      alert('Erro ao gravar Servidor.');
    },
    () => {
      this.initForm();
      this.loadServers();
    });
  }

  initForm() {
      this.serverForm = this.formBuilder.group({
        serversId: [0] ,
        ipAddress: [],
        port: [],
        hostname: []
      });
  }



  loadServers() {
    this.serverService.getServersAll()
    .subscribe(serverData => {
      this.servers = serverData;
    },
    error => {
      alert('Erro ao carregar servidores');
    },
    () => {

    });
  }
  ngOnInit() {
    this.initForm();
    this.loadServers();
  }

  ngOnChanges() {
    this.initForm();
    console.log('change');
  }

}
