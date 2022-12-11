import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model, PipelineStage } from 'mongoose';
import { Hire, HireDocument } from 'src/apis/hire/hire.schema';
import { pagination } from '../../utils/utils';
import { DetailDrawingService } from '../detail-drawing/detail-drawing.service';
import { UserService } from '../user/user.service';
import { HireFilterDto } from './dto/hire-filter.dto';
import { HireDto } from './dto/hire.dto';
import { STATUS_HIRE } from './enum/hire.enum';

@Injectable()
export class HireService {
  constructor(
    @InjectModel(Hire.name)
    private readonly hireModel: Model<HireDocument>,
    private readonly userService: UserService,
    private readonly detailDrawingService: DetailDrawingService,
  ) {}

  async getAll(filter: HireFilterDto, userId: string) {
    const { limit, page } = filter;
    const query: PipelineStage[] = [
      { $match: {} },
      {
        $lookup: {
          from: 'detaildrawings',
          localField: 'detailDrawingId',
          foreignField: '_id',
          as: 'detailDrawing',
        },
      },
      {
        $unwind: {
          path: '$detailDrawing',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'designerId',
          foreignField: '_id',
          as: 'designer',
        },
      },
      {
        $unwind: {
          path: '$designer',
          preserveNullAndEmptyArrays: true,
        },
      },
    ];

    const countDocument = this.hireModel.countDocuments(query);
    const getHire = this.hireModel
      .aggregate(query)
      .skip(page * limit - limit)
      // .sort(sort)
      .limit(limit);

    const [total, hires] = await Promise.all([countDocument, getHire]);

    return {
      totalPage: pagination(total, limit),
      currentPage: page,
      data: hires,
    };
  }

  async getById(id: string) {
    const hire = await this.hireModel.findById(id);
    if (!hire) throw new Error('Hire does not exist');
    return hire;
  }

  async create(data: HireDto, userId: string) {
    const hireInstance = plainToInstance(Hire, data);

    hireInstance.status = STATUS_HIRE.PENDING;
    await this.userService.getById(hireInstance.designerId);

    await this.detailDrawingService.getById(
      hireInstance.detailDrawingId,
      userId,
    );

    hireInstance.userId = userId;

    const newHire = new this.hireModel(hireInstance);

    return newHire.save();
  }

  async updateById(id: string, data: HireDto, userId: string) {
    const hire = await this.hireModel.findById(id).lean();
    if (!hire) throw new Error('Hire does not exist');

    if (
      userId !== hire.userId.toString() &&
      userId !== hire.designerId.toString()
    ) {
      throw new Error('You can not update hire');
    }

    return this.hireModel.findByIdAndUpdate(
      id,
      { ...hire, ...data, updatedAt: new Date() },
      { new: true },
    );
  }

  async deleteById(id: string, userId: string) {
    const hire = await this.hireModel.findById(id).lean();
    if (!hire) throw new Error('Hire does not exist');

    if (userId !== hire.userId && userId !== hire.designerId) {
      throw new Error('You can not delete hire');
    }

    return this.hireModel.findByIdAndDelete(id);
  }
}
