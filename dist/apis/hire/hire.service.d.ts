import mongoose, { Model } from 'mongoose';
import { Hire, HireDocument } from 'src/apis/hire/hire.schema';
import { ROLE } from '../../core/constants/enum';
import { DetailDrawingService } from '../detail-drawing/detail-drawing.service';
import { UserService } from '../user/user.service';
import { HireFilterDto } from './dto/hire-filter.dto';
import { HireDto } from './dto/hire.dto';
export declare class HireService {
    private readonly hireModel;
    private readonly userService;
    private readonly detailDrawingService;
    constructor(hireModel: Model<HireDocument>, userService: UserService, detailDrawingService: DetailDrawingService);
    getAll(filter: HireFilterDto, userId: string, userRole: ROLE): Promise<{
        totalPage: number;
        currentPage: number;
        data: any[];
    }>;
    getById(id: string): Promise<Hire & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    create(data: HireDto, userId: string): Promise<Hire & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    updateById(id: string, data: HireDto, userId: string): Promise<Hire & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    deleteById(id: string, userId: string): Promise<Hire & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
}
