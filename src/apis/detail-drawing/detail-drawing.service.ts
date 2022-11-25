import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import mongoose, { Model } from 'mongoose';
import {
  DetailDrawing,
  DetailDrawingDocument,
} from 'src/apis/detail-drawing/detail-drawing.schema';
import { removeKeyUndefined } from '../../utils/utils';
import { Hire } from '../hire/hire.schema';
import { Product, ProductDocument } from '../product/product.schema';
import { DetailDrawingDto } from './dto/detail-drawing.dto';
import { DetailDrawingFilterDto } from './dto/detail.drawing-filter.dto';

@Injectable()
export class DetailDrawingService {
  constructor(
    @InjectModel(DetailDrawing.name)
    private readonly detailDrawingModel: Model<DetailDrawingDocument>,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
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
          // userId: new mongoose.Types.ObjectId(userId),
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
      {
        $lookup: {
          from: 'users',
          localField: 'hire.designerId',
          foreignField: '_id',
          as: 'hire.designer',
        },
      },
      {
        $unwind: {
          path: '$hire.designer',
          preserveNullAndEmptyArrays: true,
        },
      },
      // project
      {
        $project: {
          'hire.designer.createdAt': 0,
          'hire.designer.updatedAt': 0,
          'hire.designer.password': 0,
          'hire.designer.idToken': 0,
          'hire.designer.email': 0,
          'hire.designer.signupType': 0,
          'hire.designer.status': 0,
          'hire.designer.role': 0,
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

    return this.lookupProduct(drawing);
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

    detailDrawing.userId = detailDrawing.userId.toString();
    delete detailDrawing._id;

    if (userId !== detailDrawing.userId) {
      throw new Error('You can not update detail drawing');
    }

    return this.detailDrawingModel.updateOne(
      { _id: id },
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

  private async lookupProduct(drawing: any) {
    let productIds = [];
    if (!drawing.hire) return drawing;
    drawing.hire.houseDesigns.forEach((houseDesign) => {
      houseDesign.designs.map((design) => {
        productIds = [...productIds, ...design.materials];
      });
    });

    const products = await this.productModel
      .find({ _id: { $in: [...new Set(productIds)] } })
      .lean();

    drawing.hire.houseDesigns = drawing.hire.houseDesigns.map((houseDesign) => {
      return {
        designs: houseDesign.designs.map((design) => {
          return {
            coHomeUrl: design.coHomeUrl,
            image: design.image,
            isChoose: design.isChoose,
            materials: design.materials.map(
              (material) =>
                products.filter(
                  (product) => product._id.toString() === material,
                )[0],
            ),
          };
        }),
        status: houseDesign.status,
      };
    });

    return drawing;
  }
}
