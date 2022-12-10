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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const project_schema_1 = require("./project.schema");
const utils_1 = require("../../utils/utils");
const user_schema_1 = require("../user/user.schema");
let ProjectService = class ProjectService {
    constructor(projectModel, userModel) {
        this.projectModel = projectModel;
        this.userModel = userModel;
    }
    async getAllByUser(userId) {
        return this.projectModel.find({ userId });
    }
    async getById(id, userId) {
        return this.projectModel.findOne({ id, userId });
    }
    async create(data, userId) {
        const instanceProject = (0, class_transformer_1.plainToInstance)(project_schema_1.Project, data);
        if (instanceProject.stepOne.designerId) {
            const isExistDesigner = await this.userModel
                .findOne({ id: instanceProject.stepOne.designerId })
                .lean();
            if (!isExistDesigner)
                throw new Error('Designer not found');
        }
        instanceProject.userId = userId;
        const newProject = new this.projectModel(instanceProject);
        return newProject.save();
    }
    async updateById(id, data, userId) {
        var _a;
        const instanceProject = (0, class_transformer_1.plainToInstance)(project_schema_1.Project, data);
        const project = await this.projectModel.findById(id).lean();
        if (!project)
            throw new Error('Product id does not exist');
        if (userId !== project.userId) {
            throw new Error('You can not update project');
        }
        if ((_a = instanceProject.stepOne) === null || _a === void 0 ? void 0 : _a.designerId) {
            const isExistDesigner = await this.userModel
                .findOne({ id: instanceProject.userId })
                .lean();
            if (!isExistDesigner)
                throw new Error('Designer id does not exist');
        }
        return this.projectModel.updateOne({ id }, Object.assign(Object.assign(Object.assign({}, project), (0, utils_1.removeKeyUndefined)(instanceProject)), { updatedAt: new Date() }));
    }
    async deleteById(id, userId) {
        const project = await this.projectModel.findById(id);
        if (!project)
            throw new Error('Product id does not exist');
        if (userId !== project.userId) {
            throw new Error('You can not delete project');
        }
        await this.projectModel.deleteOne({ id });
        return project;
    }
};
ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map