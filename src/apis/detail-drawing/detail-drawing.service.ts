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
    const drawing = await this.detailDrawingModel.findOne({ id, userId });
    if (!drawing) throw new Error('Detail drawing does not exists');

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
