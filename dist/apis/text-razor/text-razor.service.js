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
exports.TextRazorService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let TextRazorService = class TextRazorService {
    constructor() {
        this.request = axios_1.default.create({
            baseURL: process.env.TEXT_RAZOR_ENDPOINT,
            headers: {
                'x-requested-with': '*',
                'X-TextRazor-Key': process.env.TEXT_RAZOR_API_KEY,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    }
    async extract(textRazorDto) {
        const { text, extractors } = textRazorDto;
        const params = new URLSearchParams();
        params.append('text', text);
        params.append('extractors', extractors.join(','));
        const response = await this.request.post('/', params);
        return response.data;
    }
};
TextRazorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TextRazorService);
exports.TextRazorService = TextRazorService;
//# sourceMappingURL=text-razor.service.js.map