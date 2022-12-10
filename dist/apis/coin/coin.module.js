"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const coin_controller_1 = require("./coin.controller");
const coin_service_1 = require("./coin.service");
const coin_schema_1 = require("./coin.schema");
let CoinModule = class CoinModule {
};
CoinModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: coin_schema_1.Coin.name, schema: coin_schema_1.CoinSchema }]),
        ],
        controllers: [coin_controller_1.CoinController],
        providers: [coin_service_1.CoinService],
        exports: [coin_service_1.CoinService],
    })
], CoinModule);
exports.CoinModule = CoinModule;
//# sourceMappingURL=coin.module.js.map