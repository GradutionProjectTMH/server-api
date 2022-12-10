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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const hashPassword = require("../../core/common/hashPassword");
const enum_1 = require("../../core/constants/enum");
const firebase_1 = require("../../utils/firebase");
const user_enum_1 = require("../user/enum/user.enum");
const user_schema_1 = require("../user/user.schema");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.initializeApp = (0, firebase_1.initializeApp)();
    }
    async loginByEmail(login) {
        const user = await this.userModel
            .findOne({ email: login.email })
            .select('+password')
            .lean();
        if (!user)
            throw new Error('Email does not exist');
        if (user.status === enum_1.USER_STATUS.BLOCK)
            throw new Error('Account has been locked');
        const password = hashPassword.sha512(`${login.email}.${login.password}`);
        if (password !== user.password)
            throw new Error('Incorrect password');
        const payload = { id: user._id, role: user.role };
        const token = this.jwtService.sign(payload, {
            secret: process.env.KEY_SECRET_JWT,
            expiresIn: process.env.EXPIRES_IN,
        });
        delete user.password;
        return Object.assign(Object.assign({}, user), { token });
    }
    async loginByGoogle(data) {
        const firebase = await this.initializeApp;
        const result = await firebase.auth().verifyIdToken(data.token);
        const user = await this.userModel
            .findOne({ email: result.email })
            .select('+password')
            .lean();
        if (!user) {
            const newUser = new this.userModel({
                firstName: result['name'],
                lastName: '',
                avatar: result.picture,
                email: result.email,
                status: enum_1.USER_STATUS.ACTIVE,
                password: '',
                role: enum_1.ROLE.USER,
                idToken: data.token,
                signupType: user_enum_1.SIGNUP_TYPE.GOOGLE,
            });
            const userSave = await newUser.save();
            const payload = { id: newUser._id, role: newUser.role };
            const token = this.jwtService.sign(payload, {
                secret: process.env.KEY_SECRET_JWT,
                expiresIn: process.env.EXPIRES_IN,
            });
            delete userSave.password;
            const profile = await this.userModel.findById(userSave._id).lean();
            return Object.assign(Object.assign({}, profile), { token });
        }
        const payload = { id: user._id, role: user.role };
        const token = this.jwtService.sign(payload, {
            secret: process.env.KEY_SECRET_JWT,
            expiresIn: process.env.EXPIRES_IN,
        });
        delete user.password;
        return Object.assign(Object.assign({}, user), { token });
    }
    async register(registerDto) {
        const existEmail = await this.userModel
            .findOne({ email: registerDto.email })
            .lean();
        if (existEmail)
            throw new Error('Email already exists');
        if (registerDto.role === enum_1.ROLE.ADMIN)
            throw new Error('You do not have permission to create this account');
        const status = enum_1.USER_STATUS.ACTIVE;
        registerDto.password = hashPassword.sha512(`${registerDto.email}.${registerDto.password}`);
        const newUser = new this.userModel(Object.assign(Object.assign({}, registerDto), { status, signupType: user_enum_1.SIGNUP_TYPE.EMAIL_PASSWORD }));
        return newUser.save();
    }
    async checkToken(userId) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new Error('User does not exist!');
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map