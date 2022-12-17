import mongoose, { Document } from 'mongoose';
import { BaseSchema } from '../../base/schemas/base.schem';
import { FILE_STATUS } from './enums/file-status.enum';
export declare type UploadDocument = Upload & Document;
export declare class Upload extends BaseSchema {
    userId: string;
    location: string;
    etag: string;
    bucket: string;
    key: string;
    status: FILE_STATUS;
}
export declare const UploadSchema: mongoose.Schema<Upload, mongoose.Model<Upload, any, any, any, any>, {}, {}, {}, {}, "type", Upload>;
