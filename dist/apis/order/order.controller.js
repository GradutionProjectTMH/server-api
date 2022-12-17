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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const base_controller_1 = require("../../base/base.controller");
const enum_1 = require("../../core/constants/enum");
const auth_decorator_1 = require("../../core/decorators/auth.decorator");
const user_decorator_1 = require("../../core/decorators/user.decorator");
const order_filter_dto_1 = require("./dto/order-filter.dto");
const order_dto_1 = require("./dto/order.dto");
const order_service_1 = require("./order.service");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async getAllByUser(filter) {
        try {
            const data = await this.orderService.getAll(filter);
            return (0, base_controller_1.responseSuccess)(data);
        }
        catch (error) {
            console.log(error);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async getBySeller(userId, filter) {
        try {
            const data = await this.orderService.getBySeller(userId, filter);
            return (0, base_controller_1.responseSuccess)(data);
        }
        catch (error) {
            console.log(error);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async getByUser(userId, filter) {
        try {
            const data = await this.orderService.getByUser(userId, filter);
            return (0, base_controller_1.responseSuccess)(data);
        }
        catch (error) {
            console.log(error);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async getById(id, userId) {
        try {
            const data = await this.orderService.getById(id, userId);
            return (0, base_controller_1.responseSuccess)(data);
        }
        catch (error) {
            console.log(error);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async create(data, userId) {
        try {
            await this.orderService.create(data, userId);
            return (0, base_controller_1.responseSuccess)('Create order success');
        }
        catch (error) {
            console.log(error);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async updateById(id, data, userId, role) {
        try {
            await this.orderService.updateById(id, data, userId, role);
            return (0, base_controller_1.responseSuccess)('Update order success');
        }
        catch (error) {
            console.log(error);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async deleteById(id, userId) {
        try {
            await this.orderService.deleteById(id, userId);
            return (0, base_controller_1.responseSuccess)('Delete order success');
        }
        catch (error) {
            console.log(error);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all order by user' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_filter_dto_1.OrderFilterDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllByUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a order by seller' }),
    (0, auth_decorator_1.Auth)(enum_1.ROLE.SELLER),
    (0, common_1.Get)('/seller'),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, order_filter_dto_1.OrderFilterDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getBySeller", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a order by user' }),
    (0, auth_decorator_1.Auth)(enum_1.ROLE.USER),
    (0, common_1.Get)('/user'),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, order_filter_dto_1.OrderFilterDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getByUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a order by id' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a order' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.OrderDto, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a order' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.User)('id')),
    __param(3, (0, user_decorator_1.User)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, order_dto_1.OrderDto, String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a order' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deleteById", null);
OrderController = __decorate([
    (0, swagger_1.ApiTags)('order'),
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map