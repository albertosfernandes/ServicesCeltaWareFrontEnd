import { ModelDatabaseUser } from './ModelDatabaseUser';
import { ModelBackupSchedule } from 'src/app/models/model-backupschedule';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';
import { ModelStorageServer } from './ModelStorageServer';

export class ModelDatabase {
  databasesId: number;
  conteinerName: string;
  databaseName: string;
  customersProductsId: number;
  customerProduct: ModelCustomersProducts;
  memoryRam: number;
  directory: string;
  storage: number;
  backupScheduleId: number;
  backupSchedule: ModelBackupSchedule;
  storageServer: ModelStorageServer;
  databaseUsers: ModelDatabaseUser[] = [];
}
