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
exports.CoinService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const utils_1 = require("../../utils/utils");
const coin_schema_1 = require("./coin.schema");
let CoinService = class CoinService {
    constructor(coinModel) {
        this.coinModel = coinModel;
    }
    async getAll() {
        return this.coinModel.find().lean();
    }
    async getById(id) {
        const coin = await this.coinModel.findById(id).lean();
        if (!coin) {
            throw new Error(`Coin with id '${id}' doesn't exist`);
        }
        return coin;
    }
    async create(data) {
        const coinInstance = (0, class_transformer_1.plainToInstance)(coin_schema_1.Coin, data);
        const coin = new this.coinModel(coinInstance);
        return coin.save();
    }
    async insertMany(data) {
        await this.coinModel.remove();
        return this.coinModel.insertMany(data);
    }
    async updateById(id, data) {
        const coin = await this.coinModel.findById(id).lean();
        if (!coin) {
            throw new Error(`Coin with id '${id}' doesn't exist`);
        }
        const coinInstance = (0, class_transformer_1.plainToInstance)(coin_schema_1.Coin, data);
        return this.coinModel.findByIdAndUpdate(id, Object.assign(Object.assign(Object.assign({}, coin), (0, utils_1.removeKeyUndefined)(coinInstance)), { updatedAt: new Date() }), { new: true });
    }
    async deleteById(id) {
        const coin = await this.coinModel.findById(id).lean();
        if (!coin) {
            throw new Error(`Coin with id '${id}' doesn't exist`);
        }
        await this.coinModel.deleteOne({ _id: id });
        return coin;
    }
};
CoinService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(coin_schema_1.Coin.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CoinService);
exports.CoinService = CoinService;
//# sourceMappingURL=coin.service.js.map