/// <reference types="express-serve-static-core" />
/// <reference types="passport" />
import { FileFilterCallback } from 'multer';
export declare const multerDiskOption: {
    storage: import("multer").StorageEngine;
    fileFilter: (request: any, file: Express.Multer.File, callback: FileFilterCallback) => void;
};
export declare const multerMemoryOption: {
    storage: import("multer").StorageEngine;
    fileFilter: (request: any, file: Express.Multer.File, callback: FileFilterCallback) => void;
};
