import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import {
  DetailDrawing,
  DetailDrawingDocument,
} from 'src/apis/detail-drawing/detail-drawing.schema';
import { removeKeyUndefined } from '../../base/services/base.service';
import { DetailDrawingDto } from './dto/detail-drawing.dto';

@Injectable()
export class DetailDrawingService {
  constructor(
    @InjectModel(DetailDrawing.name)
    private readonly detailDrawingModel: Model<DetailDrawingDocument>,
  ) {}

  async getAllByUser(userId: string) {
    return this.detailDrawingModel.find({ userId });
  }

  async getById(id: string, userId: string) {
    return this.detailDrawingModel.findOne({ id, userId });
  }

  async create(data: DetailDrawingDto, userId: string) {
    const instanceProject = plainToInstance(DetailDrawing, data);

    instanceProject.userId = userId;
    const newProject = new this.detailDrawingModel(instanceProject);
    return newProject.save();
  }

  async updateById(id: string, data: DetailDrawingDto, userId: string) {
    const instanceProject = plainToInstance(DetailDrawing, data);

    const project = await this.detailDrawingModel.findById(id).lean();
    if (!project) throw new Error('Product id does not exist');

    if (userId !== project.userId) {
      throw new Error('You can not update project');
    }

    return this.detailDrawingModel.updateOne(
      { id },
      {
        ...project,
        ...removeKeyUndefined(instanceProject),
        updatedAt: new Date(),
      },
    );
  }

  async deleteById(id: string, userId: string) {
    const project = await this.detailDrawingModel.findById(id);
    if (!project) throw new Error('Product id does not exist');

    if (userId !== project.userId) {
      throw new Error('You can not delete project');
    }
    await this.detailDrawingModel.deleteOne({ id });

    return project;
  }
}
