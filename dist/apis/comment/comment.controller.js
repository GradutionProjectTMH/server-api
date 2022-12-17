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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const base_controller_1 = require("../../base/base.controller");
const comment_service_1 = require("./comment.service");
const comment_filter_dto_1 = require("./dto/comment-filter.dto");
const comment_dto_1 = require("./dto/comment.dto");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async getAll(filter) {
        try {
            const data = await this.commentService.getAll();
            return (0, base_controller_1.responseSuccess)(data);
        }
        catch (error) {
            console.log(error);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async getById(id) {
        try {
            const data = await this.commentService.getById(id);
            return (0, base_controller_1.responseSuccess)(data);
        }
        catch (error) {
            console.log(error);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async create(data) {
        try {
            await this.commentService.create(data);
            return (0, base_controller_1.responseSuccess)('Create comment success');
        }
        catch (error) {
            console.log(error);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async updateById(id, data) {
        try {
            await this.commentService.updateById(id, data);
            return (0, base_controller_1.responseSuccess)('Update comment success');
        }
        catch (error) {
            console.log(error);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
    async deleteById(id) {
        try {
            await this.commentService.deleteById(id);
            return (0, base_controller_1.responseSuccess)('Delete comment success');
        }
        catch (error) {
            console.log(error);
            return (0, base_controller_1.responseError)(error.message);
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all comment by id product' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_filter_dto_1.CommentFilterDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a comment by id' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a comment' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.CommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a comment' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, comment_dto_1.CommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "updateById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a comment' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteById", null);
CommentController = __decorate([
    (0, swagger_1.ApiTags)('comment'),
    (0, common_1.Controller)('comment'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map