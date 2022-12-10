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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const transaction_schema_1 = require("./transaction.schema");
const utils_1 = require("../../utils/utils");
let TransactionService = class TransactionService {
    constructor(transactionModel) {
        this.transactionModel = transactionModel;
    }
    async getAll() {
        return await this.transactionModel.find();
    }
    async getById(id, userId) {
        const transaction = await this.transactionModel.findById(id).lean();
        if (!transaction) {
            throw new Error(`Transaction with id '${id}' doesn't exist`);
        }
        return transaction;
    }
    async create(data, userId) {
        const transactionInstance = (0, class_transformer_1.plainToInstance)(transaction_schema_1.Transaction, data);
        const transaction = new this.transactionModel(transactionInstance);
        return transaction.save();
    }
    async updateById(id, data, userId) {
        const transaction = await this.transactionModel.findById(id).lean();
        if (!transaction) {
            throw new Error(`Transaction with id '${id}' doesn't exist`);
        }
        const transactionInstance = (0, class_transformer_1.plainToInstance)(transaction_schema_1.Transaction, data);
        return this.transactionModel.findByIdAndUpdate(id, Object.assign(Object.assign(Object.assign({}, transaction), (0, utils_1.removeKeyUndefined)(transactionInstance)), { updatedAt: new Date() }), { new: true });
    }
    async deleteById(id, userId) {
        const transaction = await this.transactionModel.findById(id).lean();
        if (!transaction) {
            throw new Error(`Transaction with id '${id}' doesn't exist`);
        }
        await this.transactionModel.deleteOne({ _id: id });
        return transaction;
    }
};
TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(transaction_schema_1.Transaction.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map