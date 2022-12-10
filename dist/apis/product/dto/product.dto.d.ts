import { PRODUCT_STATUS } from 'src/core/constants/enum';
import { TYPE_PRODUCT } from '../enum/product.enu';
export declare class ProductDto {
    name: string;
    images: string[];
    star: number;
    type: TYPE_PRODUCT;
    oldPrice: number;
    price: number;
    sale: number;
    description: string;
    verify: Record<string, any>;
    status: PRODUCT_STATUS;
}
