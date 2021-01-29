import { ModelDatabase } from './model-database';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';
import { ModelServer } from './model-server';

export class ModelBackupSchedule {
  backupScheduleId: number;
  customersProductsId: number;
  customerProduct: ModelCustomersProducts;
  type: number;
  dateHourExecution: Date;
  dateHourLastExecution: Date;
  backupStatus: number;
  databasesId: number;
  databases: ModelDatabase;
  server: ModelServer;
  googleDriveFileId: string;
}
