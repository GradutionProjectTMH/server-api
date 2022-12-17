import { Model } from 'mongoose';
import { Project, ProjectDocument } from 'src/apis/project/project.schema';
import { UserDocument } from '../user/user.schema';
import { ProjectDto } from './dto/project.dto';
export declare class ProjectService {
    private readonly projectModel;
    private readonly userModel;
    constructor(projectModel: Model<ProjectDocument>, userModel: Model<UserDocument>);
    getAllByUser(userId: string): Promise<(Project & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getById(id: string, userId: string): Promise<Project & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    create(data: ProjectDto, userId: string): Promise<Project & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateById(id: string, data: ProjectDto, userId: string): Promise<import("mongodb").UpdateResult>;
    deleteById(id: string, userId: string): Promise<Project & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
