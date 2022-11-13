import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import mongoose, { Model } from 'mongoose';
import {
  DetailDrawing,
  DetailDrawingDocument,
} from 'src/apis/detail-drawing/detail-drawing.schema';
import { removeKeyUndefined } from '../../base/services/base.service';
import { Hire } from '../hire/hire.schema';
import { DetailDrawingDto } from './dto/detail-drawing.dto';
import { DetailDrawingFilterDto } from './dto/detail.drawing-filter.dto';

@Injectable()
export class DetailDrawingService {
  constructor(
    @InjectModel(DetailDrawing.name)
    private readonly detailDrawingModel: Model<DetailDrawingDocument>,
  ) {}

  async getAll(filter: DetailDrawingFilterDto) {
    return this.detailDrawingModel.find({});
  }

  async getAllByUser(userId: string) {
    return this.detailDrawingModel.find({ userId });
  }

  async getById(id: string, userId: string) {
    const drawings = await this.detailDrawingModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      // hires
      {
        $lookup: {
          from: 'hires',
          localField: '_id',
          foreignField: 'detailDrawingId',
          as: 'hire',
        },
      },
      {
        $unwind: {
          path: '$hire',
          preserveNullAndEmptyArrays: true,
        },
      },
      // info designer in hire
      {
        $lookup: {
          from: 'designers',
          localField: 'hire.designerId',
          foreignField: 'userId',
          as: 'hire.designer',
        },
      },
      {
        $unwind: {
          path: '$hire.designer',
          preserveNullAndEmptyArrays: true,
        },
      },
      // info users
      {
        $lookup: {
          from: 'users',
          localField: 'hire.designerId',
          foreignField: '_id',
          as: 'hire.designer.user',
        },
      },
      {
        $unwind: {
          path: '$hire.designer.user',
          preserveNullAndEmptyArrays: true,
        },
      },
      // project
      {
        $project: {
          'hire.designer.createdAt': 0,
          'hire.designer.updatedAt': 0,
          'hire.designer.user.createdAt': 0,
          'hire.designer.user.updatedAt': 0,
          'hire.designer.user.password': 0,
          'hire.designer.user.idToken': 0,
          'hire.designer.user.email': 0,
          'hire.designer.user.signupType': 0,
          'hire.designer.user.status': 0,
          'hire.designer.user.role': 0,
        },
      },
      { $limit: 1 },
    ]);

    const drawing =
      Array.isArray(drawings) && drawings.length > 0 && drawings[0];
    if (!drawing) throw new Error('Detail drawing does not exists');

    if (!drawing.hire.userId) {
      drawing.hire = null;
    }

    return drawing;
  }

  async create(data: DetailDrawingDto, userId: string) {
    const detailDrawingInstance = plainToInstance(DetailDrawing, data);

    detailDrawingInstance.userId = userId;
    const newDetailDrawing = new this.detailDrawingModel(detailDrawingInstance);
    return newDetailDrawing.save();
  }

  async updateById(id: string, data: DetailDrawingDto, userId: string) {
    const detailDrawingInstance = plainToInstance(DetailDrawing, data);

    const detailDrawing = await this.detailDrawingModel.findById(id).lean();
    if (!detailDrawing) throw new Error('Product id does not exist');

    if (userId !== detailDrawing.userId) {
      throw new Error('You can not update detail drawing');
    }

    return this.detailDrawingModel.updateOne(
      { id },
      {
        ...detailDrawing,
        ...removeKeyUndefined(detailDrawingInstance),
        updatedAt: new Date(),
      },
    );
  }

  async deleteById(id: string, userId: string) {
    const detailDrawing = await this.detailDrawingModel.findById(id);
    if (!detailDrawing) throw new Error('Detail drawing id does not exist');

    if (userId !== detailDrawing.userId) {
      throw new Error('You can not delete detail drawing');
    }
    await this.detailDrawingModel.deleteOne({ id });

    return detailDrawing;
  }
}
