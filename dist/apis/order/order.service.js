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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const utils_1 = require("../../utils/utils");
const enum_1 = require("../../core/constants/enum");
const product_service_1 = require("../product/product.service");
const order_schema_1 = require("./order.schema");
let OrderService = class OrderService {
    constructor(orderModel, productService) {
        this.orderModel = orderModel;
        this.productService = productService;
    }
    async getAll(filter) {
        const { limit, page, q, status } = filter;
        const where = [{ isDelete: { $ne: true } }];
        if (status)
            where.push({ status: status });
        return this.orderModel
            .find()
            .populate('productIds', '-createdAt -updatedAt')
            .populate('userId', '-createdAt -updatedAt')
            .skip(page * limit - limit)
            .sort({})
            .limit(limit);
    }
    async getBySeller(userId, filter) {
        const { limit, page, q, status } = filter;
        const where = [
            { isDelete: { $ne: true } },
            { userId },
        ];
        if (status)
            where.push({ status: status });
        const query = { $and: where };
        const countDocument = this.orderModel.countDocuments(query);
        const getOrder = this.orderModel
            .find(query)
            .populate('productIds', '-createdAt -updatedAt')
            .populate('userId', '-createdAt -updatedAt')
            .skip(page * limit - limit)
            .sort({})
            .limit(limit);
        const [total, orders] = await Promise.all([countDocument, getOrder]);
        return {
            totalPage: (0, utils_1.pagination)(total, limit),
            currentPage: page,
            data: orders,
        };
    }
    async getByUser(userId, filter) {
        const { limit, page, q, status } = filter;
        const where = [
            { isDelete: { $ne: true } },
            { userId },
        ];
        if (status)
            where.push({ status: status });
        const query = { $and: where };
        const countDocument = this.orderModel.countDocuments(query);
        const getOrder = this.orderModel
            .find(query)
            .populate('productIds', '-createdAt -updatedAt')
            .populate('userId', '-createdAt -updatedAt')
            .skip(page * limit - limit)
            .sort({})
            .limit(limit);
        const [total, orders] = await Promise.all([countDocument, getOrder]);
        return {
            totalPage: (0, utils_1.pagination)(total, limit),
            currentPage: page,
            data: orders,
        };
    }
    async getById(id, userId) {
        const order = await this.orderModel
            .findById(id)
            .populate('productIds', '-createdAt -updatedAt')
            .populate('userId', '-createdAt -updatedAt');
        if (!order)
            throw new Error('Order does not exist');
        if (userId !== order.userId)
            throw new Error('You can not get order');
        return order;
    }
    async create(data, userId) {
        const orderInstance = (0, class_transformer_1.plainToInstance)(order_schema_1.Order, data);
        orderInstance.status = enum_1.ORDER_STATUS.PENDING;
        orderInstance.userId = userId;
        for (const product of orderInstance.products) {
            await this.productService.getById(product.productId);
        }
        const newOrder = new this.orderModel(data);
        return newOrder.save();
    }
    async updateById(id, data, userId, role) {
        const order = await this.orderModel.findById(id).lean();
        if (!order)
            throw new Error('Order does not exist');
        if (order.userId !== userId)
            throw new Error('You can not edit order');
        const orderInstance = (0, class_transformer_1.plainToInstance)(order_schema_1.Order, data);
        if (role !== enum_1.ROLE.SELLER) {
            if (order.status !== enum_1.ORDER_STATUS.PENDING) {
                throw new Error('You can not edit order');
            }
            delete orderInstance.status;
        }
        (0, utils_1.removeKeyUndefined)(orderInstance);
        return this.orderModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, orderInstance), { updatedAt: new Date() }), { new: true });
    }
    async deleteById(id, userId) {
        const order = await this.orderModel.findById(id).lean();
        if (!order)
            throw new Error('Order does not exist');
        if (order.userId !== userId)
            throw new Error('You can not edit order');
        await this.orderModel.deleteOne({ id });
        return order;
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        product_service_1.ProductService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map