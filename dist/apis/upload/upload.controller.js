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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const upload_service_1 = require("./upload.service");
const base_controller_1 = require("../../base/base.controller");
const auth_decorator_1 = require("../../core/decorators/auth.decorator");
const user_decorator_1 = require("../../core/decorators/user.decorator");
const multer_option_1 = require("../../core/multer/multer.option");
const file_filter_dto_1 = require("./dtos/file-filter.dto");
let UploadController = class UploadController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async getAll(filter) {
        try {
            const data = await this.uploadService.getAll(filter);
            return (0, base_controller_1.responseSuccess)(data);
        }
        catch (error) {
            console.log(error.message);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async upload(files, userId) {
        try {
            const data = await this.uploadService.uploadFiles(files, userId);
            return (0, base_controller_1.responseSuccess)(data);
        }
        catch (error) {
            console.log(error.message);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async removeAll() {
        try {
            await this.uploadService.removeAll();
            return (0, base_controller_1.responseSuccess)('Delete all success!');
        }
        catch (error) {
            console.log(error.message);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a upload all' }),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_filter_dto_1.FileFilterDto]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Upload files' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', null, multer_option_1.multerMemoryOption)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiPayloadTooLargeResponse)({
        description: 'The upload files size is greater than 10 MB',
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "upload", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete all upload' }),
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "removeAll", null);
UploadController = __decorate([
    (0, swagger_1.ApiTags)('uploads'),
    (0, common_1.Controller)('uploads'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
exports.UploadController = UploadController;
//# sourceMappingURL=upload.controller.js.map