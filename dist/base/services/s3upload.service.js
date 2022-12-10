"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3UploadService = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const fs_1 = require("fs");
let S3UploadService = class S3UploadService {
    constructor() {
        this.s3 = new AWS.S3({
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            },
            region: process.env.AWS_BUCKET_REGION,
        });
    }
    async s3Upload(file) {
        try {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: file.filename ||
                    `${Date.now() + '-' + Math.round(Math.random() * 1e9)}.${file.originalname.split('.').pop()}`,
                Body: file.path ? (0, fs_1.readFileSync)(file.path) : file.buffer,
                ContentType: file.mimetype,
            };
            const data = await this.s3.upload(params).promise();
            return data;
        }
        catch (error) {
            console.log('error', error);
            throw new common_1.BadRequestException('File upload failed');
        }
    }
    async s3UploadMultiple(files) {
        const params = files.map((file) => {
            return {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: file.filename ||
                    `${Date.now() + '-' + Math.round(Math.random() * 1e9)}.${file.originalname.split('.').pop()}`,
                Body: file.path ? (0, fs_1.readFileSync)(file.path) : file.buffer,
                ContentType: file.mimetype,
            };
        });
        try {
            const data = await Promise.all(params.map((params) => this.s3.upload(params).promise()));
            return data;
        }
        catch (error) {
            console.log('error', error);
            throw new common_1.BadRequestException('File upload failed');
        }
    }
    deleteFile(file) {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: file.Key,
        };
        return new Promise((resolve, reject) => {
            this.s3.deleteObject(params, (err, data) => {
                if (err) {
                    console.log('Delete file in s3 failed', err.message);
                    return reject(false);
                }
                console.log('Delete file in s3 success', data);
                return resolve(true);
            });
        });
    }
    deleteFiles(files) {
        const Keys = files.map((file) => {
            return {
                Key: file.Key,
            };
        });
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Delete: { Objects: Keys },
        };
        return new Promise((resolve, reject) => {
            this.s3.deleteObjects(params, (err, data) => {
                if (err) {
                    console.log('Delete file in s3 failed', err.message);
                    return reject(err);
                }
                console.log('Delete file in s3 success', data);
                return resolve(data);
            });
        });
    }
};
S3UploadService = __decorate([
    (0, common_1.Injectable)()
], S3UploadService);
exports.S3UploadService = S3UploadService;
//# sourceMappingURL=s3upload.service.js.map