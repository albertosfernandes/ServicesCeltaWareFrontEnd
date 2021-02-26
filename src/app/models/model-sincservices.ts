import { ModelCustomersProducts } from './model-customersproducts';

export class ModelSincservices {
   appSincServicesId: number;
   customersProductsId: number;
   customerProduct: ModelCustomersProducts;
   addressName: string;
   ipAddress: string;
   port: string;
   installDirectory: string;
   synchronizerServiceName: string;
   isCreated: boolean;
}
