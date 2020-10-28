import { ModelDatabase } from './model-database';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';

export class ModelBackupSchedule {
  backupScheduleId: number;
  customersProductsId: number;
  customerProduct: ModelCustomersProducts;
  type: number;
  dateHourExecution: Date;
  backupStatus: number;
  databasesId: number;
  databases: ModelDatabase;
}
