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
exports.DetailDrawingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const detail_drawing_schema_1 = require("./detail-drawing.schema");
const utils_1 = require("../../utils/utils");
const product_schema_1 = require("../product/product.schema");
let DetailDrawingService = class DetailDrawingService {
    constructor(detailDrawingModel, productModel) {
        this.detailDrawingModel = detailDrawingModel;
        this.productModel = productModel;
    }
    async getAll(filter) {
        return this.detailDrawingModel.find({});
    }
    async getAllByUser(userId) {
        return this.detailDrawingModel.find({ userId });
    }
    async getById(id, userId) {
        const drawings = await this.detailDrawingModel.aggregate([
            {
                $match: {
                    _id: new mongoose_2.default.Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: 'hires',
                    localField: '_id',
                    foreignField: 'detailDrawingId',
                    as: 'hire',
                },
            },
            {
                $unwind: {
                    path: '$hire',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'hire.designerId',
                    foreignField: '_id',
                    as: 'hire.designer',
                },
            },
            {
                $unwind: {
                    path: '$hire.designer',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    'hire.designer.createdAt': 0,
                    'hire.designer.updatedAt': 0,
                    'hire.designer.password': 0,
                    'hire.designer.idToken': 0,
                    'hire.designer.email': 0,
                    'hire.designer.signupType': 0,
                    'hire.designer.status': 0,
                    'hire.designer.role': 0,
                },
            },
            { $limit: 1 },
        ]);
        const drawing = Array.isArray(drawings) && drawings.length > 0 && drawings[0];
        if (!drawing)
            throw new Error('Detail drawing does not exists');
        if (!drawing.hire.userId) {
            drawing.hire = null;
        }
        return this.lookupProduct(drawing);
    }
    async create(data, userId) {
        const detailDrawingInstance = (0, class_transformer_1.plainToInstance)(detail_drawing_schema_1.DetailDrawing, data);
        detailDrawingInstance.userId = userId;
        const newDetailDrawing = new this.detailDrawingModel(detailDrawingInstance);
        return newDetailDrawing.save();
    }
    async updateById(id, data, userId) {
        const detailDrawingInstance = (0, class_transformer_1.plainToInstance)(detail_drawing_schema_1.DetailDrawing, data);
        const detailDrawing = await this.detailDrawingModel.findById(id).lean();
        if (!detailDrawing)
            throw new Error('Product id does not exist');
        detailDrawing.userId = detailDrawing.userId.toString();
        delete detailDrawing._id;
        if (userId !== detailDrawing.userId) {
            throw new Error('You can not update detail drawing');
        }
        return this.detailDrawingModel.updateOne({ _id: id }, Object.assign(Object.assign(Object.assign({}, detailDrawing), (0, utils_1.removeKeyUndefined)(detailDrawingInstance)), { updatedAt: new Date() }));
    }
    async deleteById(id, userId) {
        const detailDrawing = await this.detailDrawingModel.findById(id);
        if (!detailDrawing)
            throw new Error('Detail drawing id does not exist');
        if (userId !== detailDrawing.userId) {
            throw new Error('You can not delete detail drawing');
        }
        await this.detailDrawingModel.deleteOne({ id });
        return detailDrawing;
    }
    async lookupProduct(drawing) {
        let productIds = [];
        if (!drawing.hire)
            return drawing;
        drawing.hire.houseDesigns.forEach((houseDesign) => {
            houseDesign.designs.map((design) => {
                productIds = [...productIds, ...design.materials];
            });
        });
        const products = await this.productModel
            .find({ _id: { $in: [...new Set(productIds)] } })
            .lean();
        drawing.hire.houseDesigns = drawing.hire.houseDesigns.map((houseDesign) => {
            return {
                designs: houseDesign.designs.map((design) => {
                    return {
                        coHomeUrl: design.coHomeUrl,
                        image: design.image,
                        isChoose: design.isChoose,
                        materials: design.materials.map((material) => products.filter((product) => product._id.toString() === material)[0]),
                    };
                }),
                status: houseDesign.status,
            };
        });
        return drawing;
    }
};
DetailDrawingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(detail_drawing_schema_1.DetailDrawing.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], DetailDrawingService);
exports.DetailDrawingService = DetailDrawingService;
//# sourceMappingURL=detail-drawing.service.js.map