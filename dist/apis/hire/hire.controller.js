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
exports.HireController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const hire_service_1 = require("./hire.service");
const base_controller_1 = require("../../base/base.controller");
const enum_1 = require("../../core/constants/enum");
const auth_decorator_1 = require("../../core/decorators/auth.decorator");
const user_decorator_1 = require("../../core/decorators/user.decorator");
const hire_filter_dto_1 = require("./dto/hire-filter.dto");
const hire_dto_1 = require("./dto/hire.dto");
let HireController = class HireController {
    constructor(hireService) {
        this.hireService = hireService;
    }
    async getAll(filter, userId, userRole) {
        try {
            const data = await this.hireService.getAll(filter, userId, userRole);
            return (0, base_controller_1.responseSuccess)(data);
        }
        catch (error) {
            console.log(error);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async getById(id) {
        try {
            const data = await this.hireService.getById(id);
            return (0, base_controller_1.responseSuccess)(data);
        }
        catch (error) {
            console.log(error);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async create(data, userId) {
        try {
            await this.hireService.create(data, userId);
            return (0, base_controller_1.responseSuccess)('Create hire success');
        }
        catch (error) {
            console.log(error);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async updateById(id, data, userId) {
        try {
            await this.hireService.updateById(id, data, userId);
            return (0, base_controller_1.responseSuccess)('Update hire success');
        }
        catch (error) {
            console.log(error);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async deleteById(id, userId) {
        try {
            await this.hireService.deleteById(id, userId);
            return (0, base_controller_1.responseSuccess)('Delete hire success');
        }
        catch (error) {
            console.log(error);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all hire' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorator_1.User)('id')),
    __param(2, (0, user_decorator_1.User)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hire_filter_dto_1.HireFilterDto, String, String]),
    __metadata("design:returntype", Promise)
], HireController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a hire by id' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HireController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a hire' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hire_dto_1.HireDto, String]),
    __metadata("design:returntype", Promise)
], HireController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a hire' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, hire_dto_1.HireDto, String]),
    __metadata("design:returntype", Promise)
], HireController.prototype, "updateById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a hire' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], HireController.prototype, "deleteById", null);
HireController = __decorate([
    (0, swagger_1.ApiTags)('hire'),
    (0, common_1.Controller)('hire'),
    __metadata("design:paramtypes", [hire_service_1.HireService])
], HireController);
exports.HireController = HireController;
//# sourceMappingURL=hire.controller.js.map