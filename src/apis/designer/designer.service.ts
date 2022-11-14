import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { Designer, DesignerDocument } from 'src/apis/designer/designer.schema';
import { LIMIT, PAGE } from '../../core/constants/enum';
import { logoToolDesign } from '../../utils/tool-design';
import { pagination, removeKeyUndefined } from '../../utils/utils';
import { DesignerFilterDto } from './dto/designer-filter.dto';
import { DesignerDto } from './dto/designer.dto';

@Injectable()
export class DesignerService {
  constructor(
    @InjectModel(Designer.name)
    private readonly designerModel: Model<DesignerDocument>,
  ) {}

  async getAll(filter: DesignerFilterDto) {
    const { limit = LIMIT, page = PAGE } = filter;

    const designerQuery = this.designerModel
      .find({})
      .populate('user', '_id firstName lastName avatar')
      .limit(limit)
      .skip(page * limit - limit);

    const countDesigner = this.designerModel.countDocuments({});

    const [designers, total] = await Promise.all([
      designerQuery,
      countDesigner,
    ]);

    return {
      totalPage: pagination(total, limit),
      currentPage: page,
      data: designers,
    };
  }

  async getById(designerId: string) {
    const designer = await this.designerModel
      .findOne({ userId: designerId })
      .populate('userId', '_id firstName lastName avatar')
      .lean();

    if (!designer) {
      throw new Error(`Designer with designerId ${designerId} does not exist`);
    }

    return designer;
  }

  async create(data: DesignerDto, userId: string) {
    const isExistDesigner = await this.designerModel.findOne({ userId }).lean();
    if (isExistDesigner) {
      throw new Error(`Designer with designerId ${userId} already exist`);
    }

    const designerInstance = plainToInstance(Designer, data);

    designerInstance.userId = userId;

    designerInstance.projects = data.projects.map((project) => {
      return {
        tool: {
          name: project.tool,
          logo: logoToolDesign[project.tool],
        },
        url: project.url,
      };
    });

    const newDesigner = new this.designerModel(designerInstance);

    return newDesigner.save();
  }

  async updateById(designerId: string, data: DesignerDto) {
    const designer = await this.designerModel
      .findOne({ userId: designerId })
      .lean();

    if (!designer) {
      throw new Error(`Designer with designerId ${designerId} does not exist`);
    }

    const designerInstance = plainToInstance(Designer, data);
    removeKeyUndefined(designerInstance);

    return this.designerModel.findByIdAndUpdate(
      designer._id,
      {
        ...designer,
        ...designerInstance,

        updatedAt: new Date(),
      },
      { new: true },
    );
  }

  async deleteById(designerId: string) {
    const designer = await this.designerModel
      .findOne({ userId: designerId })
      .lean();

    if (!designer) {
      throw new Error(`Designer with designerId ${designerId} does not exist`);
    }

    return this.designerModel.deleteOne({ designerId });
  }
}
