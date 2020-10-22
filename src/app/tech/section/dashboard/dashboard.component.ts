import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ModelUser } from 'src/app/models/model-user';
import { TechService } from '../../tech.service';
import { error, element } from 'protractor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges, OnDestroy {

  constructor(private techService: TechService) { }

  user: ModelUser;
  users: ModelUser[] = [];
  usersTotal: any = 0;
  connectedUsers = 0;

  serversTotal = 0;
  portsTotal = 0;
  alerts = 0;


  async loadUsers() {
    this.techService.getUsers()
    .subscribe(userarray => {
      this.users = userarray;
      // console.log('exibindo users array: ' + this.users);
      this.validateUsersConnected();
    },
    _error => {
      alert('Erro ao carregar usuários.');
    },
    async () => {
      // this.usersTotal = this.users.length;
      // console.log('tamanho users: ' + this.usersTotal);

      // await this.delay(20000);
      // console.log('carregado com sucesso atualização em 30 segundos');
      // this.loadUsers();
            });

  }

  onClickchangeStatus(userId) {
    this.techService.changeStatusUser(userId)
    .subscribe(data => {
      console.log('alterado' + data);
    },
    // tslint:disable-next-line: no-shadowed-variable
    error => {
      alert('erro ao alterar' + error);
    },
    () => {
      this.changeUsers();
    });
  }

  private delay(ms: number): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }

  changeUsers() {
    this.techService.getUsers()
    .subscribe(userarray => {
      this.users = userarray;
      console.log('exibindo users array: ' + this.users);
    },
    _error => {
      alert('Erro ao carregar usuários.');
    },
    () => {
      this.usersTotal = this.users.length;
      console.log('alterado users: ' + this.usersTotal);
      this.validateUsersConnected();
        });
    }

    validateUsersConnected() {
      console.log('validando conexão');
      this.connectedUsers = 0;
      // tslint:disable-next-line: no-shadowed-variable
      this.users.forEach(element => {
        console.log(element);
        if (element.isConnected === true) {
          this.connectedUsers++;
        }
      });
    }

  ngOnInit() {
    // this.loadUsers();
  }

  ngOnChanges() {
    // this.changeUsers();
    // this.validateUsersConnected();
  }

  ngOnDestroy() {

  }

}
