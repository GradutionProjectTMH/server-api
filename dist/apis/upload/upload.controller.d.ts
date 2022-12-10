/// <reference types="multer" />
import { UploadService } from 'src/apis/upload/upload.service';
import { FileFilterDto } from './dtos/file-filter.dto';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    getAll(filter: FileFilterDto): Promise<{
        success: boolean;
        message: string;
    }>;
    upload(files: Express.Multer.File[], userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    removeAll(): Promise<{
        success: boolean;
        message: string;
    }>;
}
