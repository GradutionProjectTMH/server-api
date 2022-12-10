import mongoose, { Document, Mixed } from 'mongoose';
import { PRODUCT_STATUS } from 'src/core/constants/enum';
import { BaseSchema } from '../../base/schemas/base.schem';
import { TYPE_PRODUCT } from './enum/product.enu';
export declare type ProductDocument = Product & Document;
export declare class Product extends BaseSchema {
    name: string;
    images: string[];
    star: number;
    oldPrice: number;
    price: number;
    sale: number;
    comment: number;
    order: number;
    type: TYPE_PRODUCT;
    description: string;
    status: PRODUCT_STATUS;
    createdBy: string;
    verify: Mixed;
}
export declare const ProductSchema: mongoose.Schema<Product, mongoose.Model<Product, any, any, any, any>, {}, {}, {}, {}, "type", Product>;
