import mongoose, { Document } from 'mongoose';
import { Address } from '../../base/schemas/address.schema';
import { ORDER_STATUS } from '../../core/constants/enum';
declare class OrderProduct {
    productId: string;
    amount: number;
}
export declare type OrderDocument = Order & Document;
export declare class Order {
    products: OrderProduct[];
    userId: string;
    status: ORDER_STATUS;
    address: Address;
}
export declare const OrderSchema: mongoose.Schema<Order, mongoose.Model<Order, any, any, any, any>, {}, {}, {}, {}, "type", Order>;
export {};
