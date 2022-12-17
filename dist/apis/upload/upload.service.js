"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const upload_schema_1 = require("./upload.schema");
const AWS = require("aws-sdk");
const fs_1 = require("fs");
const file_status_enum_1 = require("./enums/file-status.enum");
const user_service_1 = require("../user/user.service");
const utils_1 = require("../../utils/utils");
let UploadService = class UploadService {
    constructor(uploadModel, userService) {
        this.uploadModel = uploadModel;
        this.userService = userService;
        this.s3 = new AWS.S3({
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            },
            region: process.env.AWS_BUCKET_REGION,
        });
    }
    async uploadFiles(files, userId, status = file_status_enum_1.FILE_STATUS.NON_USED) {
        const fileS3s = await this.s3UploadMultiple(files);
        const newUploads = fileS3s.map((file) => {
            return {
                userId,
                bucket: file.Bucket,
                etag: file.ETag,
                key: file.Key,
                location: file.Location,
                status,
            };
        });
        const result = await this.uploadModel.insertMany(newUploads);
        return result.map((e) => {
            return e.location;
        });
    }
    async getAll(filter) {
        const { status, userId, limit, page } = filter;
        const query = {};
        if (status)
            query.status = status;
        if (userId) {
            await this.userService.getById(userId);
            query.userId = userId;
        }
        const countDocument = this.uploadModel.countDocuments(query);
        const getUpload = this.uploadModel
            .find(query)
            .skip(page * limit - limit)
            .limit(limit);
        const [total, uploads] = await Promise.all([countDocument, getUpload]);
        return {
            totalPage: (0, utils_1.pagination)(total, limit),
            currentPage: page,
            data: uploads,
        };
    }
    async updateFileStatus(files) {
        const func = files.map((f) => {
            return this.uploadModel.updateOne({ location: f.location }, { status: f.status });
        });
        await Promise.all(func).catch((err) => console.log(err));
        return;
    }
    async removeAll() {
        const files = await this.uploadModel
            .find({
            status: file_status_enum_1.FILE_STATUS.NON_USED,
            createdAt: {
                $lte: new Date(new Date().getTime()),
            },
        })
            .lean();
        if (Array.isArray(files) && files.length === 0)
            return;
        await this.deleteFiles(files);
        return this.uploadModel.deleteMany({
            status: file_status_enum_1.FILE_STATUS.NON_USED,
            createdAt: {
                $lte: new Date(new Date().getTime()),
            },
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
            Key: file.key,
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
                Key: file.key,
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
UploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(upload_schema_1.Upload.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map