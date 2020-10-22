import { ModelBackupSchedule } from 'src/app/models/model-backupschedule';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';

export class ModelDatabase {
  databasesId: number;
  conteinerName: string;
  databaseName: string;
  customersProductsId: number;
  customerProduct: ModelCustomersProducts;
  memoryRam: number;
  directory: string;
  backupScheduleId: number;
  backupSchedule: ModelBackupSchedule;
}
