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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const utils_1 = require("../../utils/utils");
const enum_1 = require("../../core/constants/enum");
const file_status_enum_1 = require("../upload/enums/file-status.enum");
const upload_service_1 = require("../upload/upload.service");
const product_schema_1 = require("./product.schema");
let ProductService = class ProductService {
    constructor(productModel, uploadService) {
        this.productModel = productModel;
        this.uploadService = uploadService;
    }
    async getAll(filter) {
        const { limit = enum_1.LIMIT, name, page = enum_1.PAGE, minPrice, maxPrice, sortBy, } = filter;
        const where = [{ isDelete: { $ne: true } }];
        if (minPrice)
            where.push({ price: { $gte: minPrice } });
        if (maxPrice)
            where.push({ price: { $lte: maxPrice } });
        if (name)
            where.push({ name: { $regex: name, $options: 'i' } });
        const query = where.length > 0 ? { $and: where } : {};
        const sort = sortBy == enum_1.PRODUCT_SORT.ASCENDING_STAR
            ? { star: 1 }
            : sortBy == enum_1.PRODUCT_SORT.DESCENDING_STAR
                ? { star: -1 }
                : sortBy == enum_1.PRODUCT_SORT.HIGHT_TO_LOW
                    ? { unitPrice: -1 }
                    : sortBy == enum_1.PRODUCT_SORT.LOW_TO_HIGHT
                        ? { unitPrice: 1 }
                        : sortBy == enum_1.PRODUCT_SORT.NEWTS
                            ? { createdAt: -1 }
                            : {};
        const countDocument = this.productModel.countDocuments(query);
        const getProduct = this.productModel
            .find(query)
            .skip(page * limit - limit)
            .sort(sort)
            .limit(limit);
        const [total, products] = await Promise.all([countDocument, getProduct]);
        return {
            totalPage: (0, utils_1.pagination)(total, limit),
            currentPage: page,
            data: products,
        };
    }
    async getById(id) {
        const product = await this.productModel.findOne({
            _id: id,
            isDelete: { $ne: true },
        });
        if (!product)
            throw new Error('Product does not exist');
        return product;
    }
    async create(data, userId) {
        const productInstance = (0, class_transformer_1.plainToInstance)(product_schema_1.Product, data);
        productInstance.status = enum_1.PRODUCT_STATUS.APPROVE;
        productInstance.createdBy = userId;
        const newProduct = new this.productModel(productInstance);
        const product = await newProduct.save();
        this.uploadService
            .updateFileStatus(productInstance.images.map((e) => {
            return {
                location: e,
                status: file_status_enum_1.FILE_STATUS.USING,
            };
        }))
            .catch((err) => console.log(err));
        return product;
    }
    async updateById(id, data, userId, role) {
        const product = await this.productModel.findById(id).lean();
        if (!product)
            throw new Error('Product id does not exist');
        if (product.createdBy !== userId) {
            throw new Error('You can not update product');
        }
        const productInstance = (0, class_transformer_1.plainToInstance)(product_schema_1.Product, data);
        if (role !== enum_1.ROLE.ADMIN) {
            delete productInstance.status;
        }
        (0, utils_1.removeKeyUndefined)(productInstance);
        const productUpdate = await this.productModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, productInstance), { updatedAt: new Date() }), { new: true });
        const fileDeletes = [];
        product.images.forEach((image) => {
            if (!productUpdate.images.includes(image)) {
                fileDeletes.push({
                    location: image,
                    status: file_status_enum_1.FILE_STATUS.NON_USED,
                });
            }
        });
        this.uploadService
            .updateFileStatus(fileDeletes)
            .catch((err) => console.log(err));
        return productUpdate;
    }
    async deleteById(id, userId) {
        const product = await this.productModel.findById(id).lean();
        if (!product)
            throw new Error('Product id does not exist');
        if (product.createdBy !== userId)
            throw new Error('You can not update product');
        return this.productModel.findByIdAndUpdate(id, {
            isDelete: true,
            deletedAt: new Date(),
            deleteBy: userId,
        });
    }
    async deleteTrashById(id, userId) {
        const product = await this.productModel.findById(id).lean();
        if (!product)
            throw new Error('Product id does not exist');
        if (product.createdBy !== userId)
            throw new Error('You can not update product');
        await this.productModel.deleteOne({ _id: id });
        const fileDeletes = product.images.map((image) => {
            return {
                location: image,
                status: file_status_enum_1.FILE_STATUS.NON_USED,
            };
        });
        this.uploadService
            .updateFileStatus(fileDeletes)
            .catch((err) => console.log(err));
        return;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        upload_service_1.UploadService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map