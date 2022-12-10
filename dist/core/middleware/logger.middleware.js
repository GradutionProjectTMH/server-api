"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const chalk_1 = require("chalk");
const enum_1 = require("../constants/enum");
let LoggerMiddleware = class LoggerMiddleware {
    use(req, res, next) {
        res.on('close', () => {
            const { statusCode } = res;
            const logMethod = req.method === enum_1.HTTP_METHOD.GET
                ? (0, chalk_1.green)(req.method)
                : req.method === enum_1.HTTP_METHOD.POST
                    ? (0, chalk_1.yellow)(req.method)
                    : req.method === enum_1.HTTP_METHOD.PUT
                        ? (0, chalk_1.blue)(req.method)
                        : req.method === enum_1.HTTP_METHOD.DELETE
                            ? (0, chalk_1.red)(req.method)
                            : (0, chalk_1.gray)(req.method);
            console.log(`[${logMethod}]  ${statusCode === 200 ? (0, chalk_1.green)(statusCode) : (0, chalk_1.red)(statusCode)}  ${(0, chalk_1.yellow)(req.originalUrl)}  ${req.get('user-agent') || ''}`);
        });
        next();
    }
};
LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map