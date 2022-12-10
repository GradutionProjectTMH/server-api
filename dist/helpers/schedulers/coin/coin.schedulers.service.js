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
var CoinSchedulerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinSchedulerService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const coin_service_1 = require("../../../apis/coin/coin.service");
let CoinSchedulerService = CoinSchedulerService_1 = class CoinSchedulerService {
    constructor(httpService, coinService) {
        this.httpService = httpService;
        this.coinService = coinService;
        this.logger = new common_1.Logger(CoinSchedulerService_1.name);
    }
    async handleCron() {
        try {
            const coins = await this.coinService.getAll();
            if (!coins || coins.length === 0) {
                return this.logger.debug('Data in db is empty');
            }
            const listingsLatest = await this.getListingsLatest();
            const newCoins = coins.map((e) => {
                var _a;
                return Object.assign(Object.assign({}, e), { price: ((_a = listingsLatest.filter((l) => l.symbol === e.symbol)[0]) === null || _a === void 0 ? void 0 : _a.quote.USD.price) || e.price });
            });
            await this.coinService.insertMany(newCoins);
            return this.logger.debug('Crawl data success');
        }
        catch (error) {
            return this.logger.error(error);
        }
    }
    async getInFo() {
        try {
            const res = await this.httpService.axiosRef.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=ETH,BTC&aux=urls,logo,description', {
                headers: {
                    'X-CMC_PRO_API_KEY': process.env.KEY_COIN_MARKET_CAP,
                },
            });
            const result = res.data;
            return result;
        }
        catch (error) {
            throw new Error('Function [getInFo]: ' + error);
        }
    }
    async getListingsLatest() {
        try {
            const res = await this.httpService.axiosRef.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?convert=USD', {
                headers: {
                    'X-CMC_PRO_API_KEY': process.env.KEY_COIN_MARKET_CAP,
                },
            });
            const result = res.data.data;
            return result;
        }
        catch (error) {
            throw new Error('Function [getListingsLatest]: ' + error);
        }
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_HOURS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoinSchedulerService.prototype, "handleCron", null);
CoinSchedulerService = CoinSchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        coin_service_1.CoinService])
], CoinSchedulerService);
exports.CoinSchedulerService = CoinSchedulerService;
//# sourceMappingURL=coin.schedulers.service.js.map