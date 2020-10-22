import { ModelCustomer } from './model-customer';

export class ModelCertificate {
  certificateId: number;
  customerId: number;
  customer: ModelCustomer;
  fileRepositorie: string;
  fileName: string;
  friendlyName: string;
  password: string;
  dateHourExpiration: string;
  isInstalled: boolean;
}
