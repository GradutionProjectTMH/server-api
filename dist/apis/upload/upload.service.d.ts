/// <reference types="multer" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
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
