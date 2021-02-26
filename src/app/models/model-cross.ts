import { ModelCustomersProducts } from './model-customersproducts';

export class ModelCross {
   appCrossId: number;
   customersProductsId: number;
   customerProduct: ModelCustomersProducts;
   addressName: string;
   ipAddress: string;
   port: string;
   installDirectory: string;
   isCreated: boolean;
}
