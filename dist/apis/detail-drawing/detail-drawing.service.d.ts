import mongoose, { Model } from 'mongoose';
import { DetailDrawing, DetailDrawingDocument } from 'src/apis/detail-drawing/detail-drawing.schema';
import { ProductDocument } from '../product/product.schema';
import { DetailDrawingDto } from './dto/detail-drawing.dto';
import { DetailDrawingFilterDto } from './dto/detail.drawing-filter.dto';
export declare class DetailDrawingService {
    private readonly detailDrawingModel;
    private readonly productModel;
    constructor(detailDrawingModel: Model<DetailDrawingDocument>, productModel: Model<ProductDocument>);
    getAll(filter: DetailDrawingFilterDto): Promise<(DetailDrawing & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    getAllByUser(userId: string): Promise<(DetailDrawing & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    getById(id: string, userId: string): Promise<any>;
    create(data: DetailDrawingDto, userId: string): Promise<DetailDrawing & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    updateById(id: string, data: DetailDrawingDto, userId: string): Promise<import("mongodb").UpdateResult>;
    deleteById(id: string, userId: string): Promise<DetailDrawing & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    private lookupProduct;
}
