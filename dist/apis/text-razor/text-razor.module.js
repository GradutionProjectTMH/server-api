"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextRazorModule = void 0;
const common_1 = require("@nestjs/common");
const text_razor_controller_1 = require("./text-razor.controller");
const text_razor_service_1 = require("./text-razor.service");
let TextRazorModule = class TextRazorModule {
};
TextRazorModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [text_razor_controller_1.TextRazorController],
        providers: [text_razor_service_1.TextRazorService],
    })
], TextRazorModule);
exports.TextRazorModule = TextRazorModule;
//# sourceMappingURL=text-razor.module.js.map