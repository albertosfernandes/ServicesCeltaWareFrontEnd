import { ModelCustomersProducts } from './model-customersproducts';

export class ModelBsf {
   appBsfsId: number;
   customersProductsId: number;
   customerProduct: ModelCustomersProducts;
   addressName: string;
   ipAddress: string;
   port: string;
   userName: string;
   password: string;
   installDirectory: string;
   isCreated: boolean;
}
