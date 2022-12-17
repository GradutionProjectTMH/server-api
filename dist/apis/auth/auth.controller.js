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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const IResponse_1 = require("../../core/interfaces/IResponse");
const base_controller_1 = require("../../base/base.controller");
const auth_decorator_1 = require("../../core/decorators/auth.decorator");
const user_decorator_1 = require("../../core/decorators/user.decorator");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const register_dto_1 = require("./dto/register.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async loginByEmail(data) {
        try {
            const result = await this.authService.loginByEmail(data);
            return (0, base_controller_1.responseSuccess)(result);
        }
        catch (error) {
            console.log(error);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async loginByGoogle(data) {
        try {
            const result = await this.authService.loginByGoogle(data);
            return (0, base_controller_1.responseSuccess)(result);
        }
        catch (error) {
            console.log(error);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async register(registerDto) {
        try {
            const data = await this.authService.register(registerDto);
            return (0, base_controller_1.responseSuccess)(data);
        }
        catch (error) {
            console.log(error);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async checkToken(userId) {
        try {
            const result = await this.authService.checkToken(userId);
            return (0, base_controller_1.responseSuccess)(result);
        }
        catch (error) {
            console.log(error);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Login' }),
    (0, common_1.Post)('login-by-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginByEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginByEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Login' }),
    (0, common_1.Post)('login-by-google'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginByGoogleDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginByGoogle", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Login' }),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'check token' }),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)('check-token'),
    __param(0, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkToken", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map