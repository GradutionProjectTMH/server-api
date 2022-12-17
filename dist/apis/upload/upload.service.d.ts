/// <reference types="multer" />
import { Model } from 'mongoose';
import { Upload, UploadDocument } from 'src/apis/upload/upload.schema';
import { FILE_STATUS } from './enums/file-status.enum';
import { FileFilterDto } from './dtos/file-filter.dto';
import { UserService } from '../user/user.service';
import { FileDto } from './dtos/file.dto';
export declare class UploadService {
    private readonly uploadModel;
    private readonly userService;
    private s3;
    constructor(uploadModel: Model<UploadDocument>, userService: UserService);
    uploadFiles(files: Express.Multer.File[], userId: string, status?: FILE_STATUS): Promise<string[]>;
    getAll(filter: FileFilterDto): Promise<{
        totalPage: number;
        currentPage: number;
        data: (Upload & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    updateFileStatus(files: FileDto[]): Promise<void>;
    removeAll(): Promise<import("mongodb").DeleteResult>;
    private s3Upload;
    private s3UploadMultiple;
    private deleteFile;
    private deleteFiles;
}
