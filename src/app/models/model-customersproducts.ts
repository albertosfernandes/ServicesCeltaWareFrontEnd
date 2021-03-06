import { ModelServer } from './model-server';
import { ModelCustomer } from './model-customer';
import { ModelProduct } from './model-product';

export class ModelCustomersProducts {
    customersProductsId: number;
    customerId: number;
    customer: ModelCustomer;
    productId: number;
    product: ModelProduct;
    addressName: string;
    ipAddress: string;
    port: string;
    loginUser: string;
    loginPassword: string;
    isCreated: boolean;
    installDirectory: string;
    synchronizerServiceName: string;
    serversId: number;
    server: ModelServer;
}
