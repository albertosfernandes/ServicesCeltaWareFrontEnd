import { ModelDatabase } from './../../../models/model-database';
import { ServiceDatabaseService } from './../../../services/service-database.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnChanges, OnDestroy, SimpleChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModelServer } from 'src/app/models/model-server';
import { ModelDatabaseUser } from 'src/app/models/ModelDatabaseUser';

@Component({
  selector: 'app-form-databaseuser',
  templateUrl: './form-databaseuser.component.html',
  styleUrls: ['./form-databaseuser.component.css']
})
export class FormDatabaseuserComponent implements OnInit, OnChanges, OnDestroy {

  @Input() database: ModelDatabase;
  @Input() server: ModelServer;
  databasePasswordForm: FormGroup;
  databaseUsers: ModelDatabaseUser[] = [];
  databaseUser: ModelDatabaseUser = new ModelDatabaseUser();
  databaseUserCeltaBS: ModelDatabaseUser = new ModelDatabaseUser();
  sub: Subscription[] = [];

  constructor(private formBuilder: FormBuilder, private databaseService: ServiceDatabaseService) { }

  initFormPassword() {
    this.databasePasswordForm = this.formBuilder.group({
      databasesUsersId: [0],
      databasesUserSa: ['sa'],
      databasePasswordSa: [],
      databasesUserCeltaBS: ['celtabsuser'],
      databasePasswordCeltaBS: []
    });
  }

  onSubmitDatabasePassword() {
    // this.database = this.databaseForm.getRawValue();
    this.databaseUserCeltaBS.Name = this.databasePasswordForm.get('databasesUserCeltaBS').value,
    this.databaseUserCeltaBS.Password = this.databasePasswordForm.get('databasePasswordCeltaBS').value;
    this.databaseUserCeltaBS.DatabasesId = this.database.databasesId;
    this.databaseUserCeltaBS.DatabasesUsersId = 0;

    this.databaseUsers.push(this.databaseUserCeltaBS);


    this.databaseUser.Name = this.databasePasswordForm.get('databasesUserSa').value,
    this.databaseUser.Password = this.databasePasswordForm.get('databasePasswordSa').value;
    this.databaseUser.DatabasesId = this.database.databasesId;
    this.databaseUser.DatabasesUsersId = 0;

    this.databaseUsers.push(this.databaseUser);

    this.sub.push(
      this.databaseService.addDatabaseUserPassword(this.server.ipAddress + ':' + this.server.port, this.databaseUsers)
      .subscribe(response => {
        console.log(response);
      },
      erro => {
        alert(erro.error);
      },
      () => {
        alert('Alterado com sucesso.');
      })
      );
    }

  ngOnInit() {
    this.initFormPassword();
  }
  ngOnDestroy(): void {
    this.sub.forEach(s => {
      s.unsubscribe();
    });
  }
  ngOnChanges(): void {
  }

}
