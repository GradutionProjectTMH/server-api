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
exports.DetailDrawingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const detail_drawing_service_1 = require("./detail-drawing.service");
const base_controller_1 = require("../../base/base.controller");
const auth_decorator_1 = require("../../core/decorators/auth.decorator");
const user_decorator_1 = require("../../core/decorators/user.decorator");
const detail_drawing_dto_1 = require("./dto/detail-drawing.dto");
const detail_drawing_filter_dto_1 = require("./dto/detail.drawing-filter.dto");
let DetailDrawingController = class DetailDrawingController {
    constructor(detailDrawingService) {
        this.detailDrawingService = detailDrawingService;
    }
    async getAll(filter) {
        try {
            const data = await this.detailDrawingService.getAll(filter);
            return (0, base_controller_1.responseSuccess)(data);
        }
        catch (error) {
            console.log(error.message);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async getById(id, userId) {
        try {
            const data = await this.detailDrawingService.getById(id, userId);
            return (0, base_controller_1.responseSuccess)(data);
        }
        catch (error) {
            console.log(error.message);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async create(body, userId) {
        try {
            const data = await this.detailDrawingService.create(body, userId);
            return (0, base_controller_1.responseSuccess)(data);
        }
        catch (error) {
            console.log(error.message);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async updateById(id, data, userId) {
        try {
            await this.detailDrawingService.updateById(id, data, userId);
            return (0, base_controller_1.responseSuccess)('Update drawing success');
        }
        catch (error) {
            console.log(error.message);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async deleteById(id, userId) {
        try {
            await this.detailDrawingService.deleteById(id, userId);
            return (0, base_controller_1.responseSuccess)('Delete drawing success');
        }
        catch (error) {
            console.log(error.message);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all drawing' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [detail_drawing_filter_dto_1.DetailDrawingFilterDto]),
    __metadata("design:returntype", Promise)
], DetailDrawingController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a drawing by id' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DetailDrawingController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a drawing' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [detail_drawing_dto_1.DetailDrawingDto, String]),
    __metadata("design:returntype", Promise)
], DetailDrawingController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a drawing' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, detail_drawing_dto_1.DetailDrawingDto, String]),
    __metadata("design:returntype", Promise)
], DetailDrawingController.prototype, "updateById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a drawing' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DetailDrawingController.prototype, "deleteById", null);
DetailDrawingController = __decorate([
    (0, swagger_1.ApiTags)('detail-drawings'),
    (0, common_1.Controller)('detail-drawings'),
    __metadata("design:paramtypes", [detail_drawing_service_1.DetailDrawingService])
], DetailDrawingController);
exports.DetailDrawingController = DetailDrawingController;
//# sourceMappingURL=detail-drawing.controller.js.map