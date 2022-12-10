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
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const project_service_1 = require("./project.service");
const base_controller_1 = require("../../base/base.controller");
const auth_decorator_1 = require("../../core/decorators/auth.decorator");
const user_decorator_1 = require("../../core/decorators/user.decorator");
const multer_option_1 = require("../../core/multer/multer.option");
const project_dto_1 = require("./dto/project.dto");
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    async getAll(userId) {
        try {
            const data = await this.projectService.getAllByUser(userId);
            return (0, base_controller_1.responseSuccess)(data);
        }
        catch (error) {
            console.log(error.message);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async getById(id, userId) {
        try {
            const data = await this.projectService.getById(id, userId);
            return (0, base_controller_1.responseSuccess)(data);
        }
        catch (error) {
            console.log(error.message);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async create(body, userId) {
        try {
            const data = await this.projectService.create(body, userId);
            return (0, base_controller_1.responseSuccess)(data);
        }
        catch (error) {
            console.log(error.message);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async updateById(id, data, userId) {
        try {
            await this.projectService.updateById(id, data, userId);
            return (0, base_controller_1.responseSuccess)('Update project success');
        }
        catch (error) {
            console.log(error.message);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async deleteById(id, userId) {
        try {
            await this.projectService.deleteById(id, userId);
            return (0, base_controller_1.responseSuccess)('Delete project success');
        }
        catch (error) {
            console.log(error.message);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all project' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a project by id' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a project' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'boundaryImg', maxCount: 1 },
        { name: 'crossSectionImg', maxCount: 1 },
    ], multer_option_1.multerDiskOption)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                star: { type: 'number' },
                oldPrice: { type: 'number' },
                price: { type: 'number' },
                sale: { type: 'number' },
                description: { type: 'string' },
                boundaryImg: {
                    type: 'string',
                    format: 'binary',
                },
                crossSectionImg: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, swagger_1.ApiPayloadTooLargeResponse)({
        description: 'The upload files size is greater than 10 MB',
    }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.ProjectDto, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a project' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, project_dto_1.ProjectDto, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "updateById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a project' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "deleteById", null);
ProjectController = __decorate([
    (0, swagger_1.ApiTags)('project'),
    (0, common_1.Controller)('project'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map