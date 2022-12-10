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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const tool_design_1 = require("../../utils/tool-design");
const utils_1 = require("../../utils/utils");
const file_status_enum_1 = require("../upload/enums/file-status.enum");
const upload_service_1 = require("../upload/upload.service");
let UserService = class UserService {
    constructor(userModel, uploadService) {
        this.userModel = userModel;
        this.uploadService = uploadService;
    }
    async getAll(filter) {
        const { limit, page, typeUser } = filter;
        const query = {};
        if (typeUser)
            query.role = typeUser;
        const countDocument = this.userModel.countDocuments(query);
        const userQuery = this.userModel
            .find(query)
            .skip(page * limit - limit)
            .limit(limit);
        const [total, users] = await Promise.all([countDocument, userQuery]);
        return {
            totalPage: (0, utils_1.pagination)(total, limit),
            currentPage: page,
            data: users,
        };
    }
    async getById(id) {
        const user = await this.userModel.findById(id);
        if (!user)
            throw new Error('User  not found');
        return user;
    }
    async updateProfile(data, userId) {
        const userInstance = (0, class_transformer_1.plainToInstance)(user_schema_1.User, data);
        if (data.profile && Array.isArray(data.profile.projects)) {
            userInstance.profile.projects = data.profile.projects.map((project) => {
                return {
                    tool: {
                        name: project.tool,
                        logo: tool_design_1.logoToolDesign[project.tool],
                    },
                    url: project.url,
                };
            });
        }
        (0, utils_1.removeKeyUndefined)(userInstance);
        const user = await this.userModel.findByIdAndUpdate(userId, Object.assign(Object.assign({}, userInstance), { updatedAt: new Date() }), { new: true });
        if (!user)
            throw new Error('User not found');
        return user;
    }
    async uploadAvatar(userId, avatar) {
        const user = await this.userModel.findById(userId).lean();
        if (!user)
            throw new Error('User not found');
        const file = await this.uploadService.uploadFiles([avatar], userId, file_status_enum_1.FILE_STATUS.USING);
        await this.userModel.updateOne({ _id: userId }, { avatar: file[0] });
        if (user.avatar) {
            this.uploadService.updateFileStatus([
                { location: user.avatar, status: file_status_enum_1.FILE_STATUS.NON_USED },
            ]);
        }
        return Object.assign(Object.assign({}, user), { avatar: file[0] });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => upload_service_1.UploadService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        upload_service_1.UploadService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map