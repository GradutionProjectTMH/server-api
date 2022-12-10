import { DetailDrawingService } from 'src/apis/detail-drawing/detail-drawing.service';
import { DetailDrawingDto } from './dto/detail-drawing.dto';
import { DetailDrawingFilterDto } from './dto/detail.drawing-filter.dto';
export declare class DetailDrawingController {
    private readonly detailDrawingService;
    constructor(detailDrawingService: DetailDrawingService);
    getAll(filter: DetailDrawingFilterDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getById(id: string, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    create(body: DetailDrawingDto, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    updateById(id: string, data: DetailDrawingDto, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteById(id: string, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
