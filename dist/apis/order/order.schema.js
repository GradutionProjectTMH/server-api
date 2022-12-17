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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = exports.Order = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const address_schema_1 = require("../../base/schemas/address.schema");
const enum_1 = require("../../core/constants/enum");
const schema_decorator_1 = require("../../core/decorators/schema.decorator");
const product_schema_1 = require("../product/product.schema");
const user_schema_1 = require("../user/user.schema");
let OrderProduct = class OrderProduct {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: product_schema_1.Product.name }),
    __metadata("design:type", String)
], OrderProduct.prototype, "productId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], OrderProduct.prototype, "amount", void 0);
OrderProduct = __decorate([
    (0, mongoose_1.Schema)()
], OrderProduct);
let Order = class Order {
};
__decorate([
    (0, mongoose_1.Prop)({ type: (Array) }),
    __metadata("design:type", Array)
], Order.prototype, "products", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: user_schema_1.User.name }),
    __metadata("design:type", String)
], Order.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: enum_1.ORDER_STATUS, default: enum_1.ORDER_STATUS.PENDING }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: address_schema_1.Address }),
    __metadata("design:type", address_schema_1.Address)
], Order.prototype, "address", void 0);
Order = __decorate([
    (0, schema_decorator_1.DSchema)()
], Order);
exports.Order = Order;
exports.OrderSchema = mongoose_1.SchemaFactory.createForClass(Order);
//# sourceMappingURL=order.schema.js.map