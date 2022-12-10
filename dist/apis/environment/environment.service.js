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
exports.EnvironmentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const fs = require("fs");
const mongoose_2 = require("mongoose");
const environment_enum_1 = require("./enum/environment.enum");
const environment_schema_1 = require("./environment.schema");
let EnvironmentService = class EnvironmentService {
    constructor(environmentModel) {
        this.environmentModel = environmentModel;
    }
    async getAll() {
        const environment = await this.environmentModel.findOne({
            name: environment_enum_1.ENVIRONMENT.FRONT_END,
        });
        console.log('environment', environment);
        if (!environment)
            return this.create();
        return JSON.parse(environment.environment || null);
    }
    async create() {
        const data = fs.readFileSync('public/env.client.json', 'utf8');
        console.log(data);
        console.log(typeof data);
        const newEnvironment = new this.environmentModel({
            name: environment_enum_1.ENVIRONMENT.FRONT_END,
            environment: data,
        });
        const environment = await newEnvironment.save();
        return JSON.parse(environment.environment || null);
    }
    async updateById(data) {
        if (typeof data === 'object') {
            data = JSON.stringify(data);
        }
        const isExitEnvironment = await this.environmentModel
            .findOne({ name: environment_enum_1.ENVIRONMENT.FRONT_END })
            .lean();
        if (!isExitEnvironment)
            return this.create();
        return this.environmentModel.findOneAndUpdate({ name: environment_enum_1.ENVIRONMENT.FRONT_END }, { environment: data }, { new: true });
    }
};
EnvironmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(environment_schema_1.Environment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EnvironmentService);
exports.EnvironmentService = EnvironmentService;
//# sourceMappingURL=environment.service.js.map