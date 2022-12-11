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
exports.HireService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const hire_schema_1 = require("./hire.schema");
const utils_1 = require("../../utils/utils");
const detail_drawing_service_1 = require("../detail-drawing/detail-drawing.service");
const user_service_1 = require("../user/user.service");
const hire_enum_1 = require("./enum/hire.enum");
let HireService = class HireService {
    constructor(hireModel, userService, detailDrawingService) {
        this.hireModel = hireModel;
        this.userService = userService;
        this.detailDrawingService = detailDrawingService;
    }
    async getAll(filter, userId) {
        const { limit, page } = filter;
        const query = [
            { $match: {} },
            {
                $lookup: {
                    from: 'detaildrawings',
                    localField: 'detailDrawingId',
                    foreignField: '_id',
                    as: 'detailDrawing',
                },
            },
            {
                $project: {
                    detailDrawingId: 0,
                },
            },
            {
                $unwind: {
                    path: '$detailDrawing',
                    preserveNullAndEmptyArrays: true,
                },
            },
        ];
        const countDocument = this.hireModel.countDocuments(query);
        const getHire = this.hireModel
            .aggregate(query)
            .skip(page * limit - limit)
            .limit(limit);
        const [total, hires] = await Promise.all([countDocument, getHire]);
        return {
            totalPage: (0, utils_1.pagination)(total, limit),
            currentPage: page,
            data: hires,
        };
    }
    async getById(id) {
        const hire = await this.hireModel.findById(id);
        if (!hire)
            throw new Error('Hire does not exist');
        return hire;
    }
    async create(data, userId) {
        const hireInstance = (0, class_transformer_1.plainToInstance)(hire_schema_1.Hire, data);
        hireInstance.status = hire_enum_1.STATUS_HIRE.PENDING;
        await this.userService.getById(hireInstance.designerId);
        await this.detailDrawingService.getById(hireInstance.detailDrawingId, userId);
        hireInstance.userId = userId;
        const newHire = new this.hireModel(hireInstance);
        return newHire.save();
    }
    async updateById(id, data, userId) {
        const hire = await this.hireModel.findById(id).lean();
        if (!hire)
            throw new Error('Hire does not exist');
        if (userId !== hire.userId.toString() &&
            userId !== hire.designerId.toString()) {
            throw new Error('You can not update hire');
        }
        return this.hireModel.findByIdAndUpdate(id, Object.assign(Object.assign(Object.assign({}, hire), data), { updatedAt: new Date() }), { new: true });
    }
    async deleteById(id, userId) {
        const hire = await this.hireModel.findById(id).lean();
        if (!hire)
            throw new Error('Hire does not exist');
        if (userId !== hire.userId && userId !== hire.designerId) {
            throw new Error('You can not delete hire');
        }
        return this.hireModel.findByIdAndDelete(id);
    }
};
HireService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(hire_schema_1.Hire.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        detail_drawing_service_1.DetailDrawingService])
], HireService);
exports.HireService = HireService;
//# sourceMappingURL=hire.service.js.map