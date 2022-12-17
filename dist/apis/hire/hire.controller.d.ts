import { HireService } from 'src/apis/hire/hire.service';
import { ROLE } from '../../core/constants/enum';
import { HireFilterDto } from './dto/hire-filter.dto';
import { HireDto } from './dto/hire.dto';
export declare class HireController {
    private readonly hireService;
    constructor(hireService: HireService);
    getAll(filter: HireFilterDto, userId: string, userRole: ROLE): Promise<{
        success: boolean;
        message: string;
    }>;
    getById(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    create(data: HireDto, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    updateById(id: string, data: HireDto, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteById(id: string, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
