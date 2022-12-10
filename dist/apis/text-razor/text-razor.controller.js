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
exports.TextRazorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const base_controller_1 = require("../../base/base.controller");
const text_razor_dto_1 = require("./dto/text-razor.dto");
const text_razor_service_1 = require("./text-razor.service");
let TextRazorController = class TextRazorController {
    constructor(textRazorService) {
        this.textRazorService = textRazorService;
    }
    async extract(textRazorDto) {
        try {
            const data = await this.textRazorService.extract(textRazorDto);
            return (0, base_controller_1.responseSuccess)(data);
        }
        catch (error) {
            console.log(error.message);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all transaction' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [text_razor_dto_1.TextRazorDto]),
    __metadata("design:returntype", Promise)
], TextRazorController.prototype, "extract", null);
TextRazorController = __decorate([
    (0, swagger_1.ApiTags)('text-razor'),
    (0, common_1.Controller)('text-razor'),
    __metadata("design:paramtypes", [text_razor_service_1.TextRazorService])
], TextRazorController);
exports.TextRazorController = TextRazorController;
//# sourceMappingURL=text-razor.controller.js.map