import { ORDER_STATUS } from 'src/core/constants/enum';
import { AddressDto } from '../../../base/dto/address.dto';
declare class OrderProductDto {
    productId: string;
    amount: number;
}
export declare class OrderDto {
    products: OrderProductDto[];
    status: ORDER_STATUS;
    address: AddressDto;
}
export {};
