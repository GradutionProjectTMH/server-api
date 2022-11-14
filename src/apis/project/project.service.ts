import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from 'src/apis/project/project.schema';
import { removeKeyUndefined } from '../../utils/utils';
import { User, UserDocument } from '../user/user.schema';
import { ProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getAllByUser(userId: string) {
    return this.projectModel.find({ userId });
  }

  async getById(id: string, userId: string) {
    return this.projectModel.findOne({ id, userId });
  }

  async create(data: ProjectDto, userId: string) {
    const instanceProject = plainToInstance(Project, data);

    if (instanceProject.stepOne.designerId) {
      const isExistDesigner = await this.userModel
        .findOne({ id: instanceProject.stepOne.designerId })
        .lean();
      if (!isExistDesigner) throw new Error('Designer not found');
    }

    instanceProject.userId = userId;
    const newProject = new this.projectModel(instanceProject);
    return newProject.save();
  }

  async updateById(id: string, data: ProjectDto, userId: string) {
    const instanceProject = plainToInstance(Project, data);

    const project = await this.projectModel.findById(id).lean();
    if (!project) throw new Error('Product id does not exist');

    if (userId !== project.userId) {
      throw new Error('You can not update project');
    }

    if (instanceProject.stepOne?.designerId) {
      const isExistDesigner = await this.userModel
        .findOne({ id: instanceProject.userId })
        .lean();
      if (!isExistDesigner) throw new Error('Designer id does not exist');
    }

    return this.projectModel.updateOne(
      { id },
      {
        ...project,
        ...removeKeyUndefined(instanceProject),
        updatedAt: new Date(),
      },
    );
  }

  async deleteById(id: string, userId: string) {
    const project = await this.projectModel.findById(id);
    if (!project) throw new Error('Product id does not exist');

    if (userId !== project.userId) {
      throw new Error('You can not delete project');
    }
    await this.projectModel.deleteOne({ id });

    return project;
  }
}
