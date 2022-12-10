/// <reference types="multer" />
import * as AWS from 'aws-sdk';
interface File {
    Key: string;
}
export declare class S3UploadService {
    private s3;
    s3Upload(file: Express.Multer.File): Promise<AWS.S3.ManagedUpload.SendData>;
    s3UploadMultiple(files: Array<Express.Multer.File>): Promise<AWS.S3.ManagedUpload.SendData[]>;
    deleteFile(file: File): Promise<unknown>;
    deleteFiles(files: Array<File>): Promise<unknown>;
}
export {};
