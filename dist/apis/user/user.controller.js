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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("./user.service");
const base_controller_1 = require("../../base/base.controller");
const auth_decorator_1 = require("../../core/decorators/auth.decorator");
const user_decorator_1 = require("../../core/decorators/user.decorator");
const multer_option_1 = require("../../core/multer/multer.option");
const utils_1 = require("../../utils/utils");
const user_filter_dto_1 = require("./dto/user-filter.dto");
const user_dto_1 = require("./dto/user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getAll(filter) {
        try {
            const data = await this.userService.getAll(filter);
            return (0, base_controller_1.responseSuccess)(data);
        }
        catch (error) {
            console.log(error.message);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async getById(userId) {
        try {
            const data = await this.userService.getById(userId);
            return (0, base_controller_1.responseSuccess)(data);
        }
        catch (error) {
            console.log(error.message);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async uploadAvatar(userId, avatar) {
        try {
            const data = await this.userService.uploadAvatar(userId, avatar);
            return (0, base_controller_1.responseSuccess)(data);
        }
        catch (error) {
            console.log(error.message);
            (0, utils_1.removeFile)(avatar.filename);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async updateById(body, userId) {
        try {
            const data = await this.userService.updateProfile(body, userId);
            return (0, base_controller_1.responseSuccess)(data);
        }
        catch (error) {
            console.log(error.message);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all user' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_filter_dto_1.UserFilterDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a user by id' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)('profile'),
    __param(0, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a user' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', multer_option_1.multerMemoryOption)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                avatar: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, swagger_1.ApiPayloadTooLargeResponse)({
        description: 'The upload files size is greater than 10 MB',
    }),
    (0, common_1.Put)('avatar'),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadAvatar", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a user' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Put)('profile'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateById", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map