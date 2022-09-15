import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { pagination } from '../../base/base.service';
import { LIMIT, PAGE, PRODUCT_SORT } from '../../core/constants/enum';
import { ProductFilterDto } from './dto/product-filter.dto';
import { ProductDto } from './dto/product.dto';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getAll(filter: ProductFilterDto) {
    const {
      limit = LIMIT,
      name,
      page = PAGE,
      minPrice,
      maxPrice,
      sortBy,
    } = filter;

    const where: FilterQuery<Product>[] = [{ isDelete: { $ne: true } }];

    if (minPrice) where.push({ price: { $gte: minPrice } });

    if (maxPrice) where.push({ price: { $lte: maxPrice } });

    if (name) where.push({ name: { $regex: name, $options: 'i' } });

    const query: FilterQuery<Product> = where.length > 0 ? { $and: where } : {};

    const sort: any =
      sortBy == PRODUCT_SORT.ASCENDING_STAR
        ? { star: 1 }
        : sortBy == PRODUCT_SORT.DESCENDING_STAR
        ? { star: -1 }
        : sortBy == PRODUCT_SORT.HIGHT_TO_LOW
        ? { unitPrice: -1 }
        : sortBy == PRODUCT_SORT.LOW_TO_HIGHT
        ? { unitPrice: 1 }
        : sortBy == PRODUCT_SORT.NEWST
        ? { createdAt: -1 }
        : {};

    const countDocument = this.productModel.countDocuments(query);
    const getProduct = this.productModel
      .find(query)
      // .populate('restaurant', '-createdAt -updatedAt')
      .skip(page * limit - limit)
      .sort(sort)
      .limit(limit);

    const [total, products] = await Promise.all([countDocument, getProduct]);

    return {
      totalPage: pagination(total, limit),
      currentPage: page,
      data: products,
    };
  }

  async getById(id: string) {
    const product = await this.productModel.findOne({
      _id: id,
      isDelete: { $ne: true },
    });
    if (!product) throw new Error('Product does not exist');
    return product;
  }

  async create(data: ProductDto, user: string) {
    const newProduct = new this.productModel({ ...data, createdBy: user });
    return newProduct.save();
  }

  async updateById(id: string, data: ProductDto) {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true },
    );
    if (!product) throw new Error('Can not update product');
  }

  async deleteById(id: string, user: string) {
    const product = await this.productModel.findById(id).lean();

    if (!product) throw new Error('Product id is not exits');
    if ((product.createdBy as any) !== user)
      throw new Error('Can not update product');

    return this.productModel.findByIdAndUpdate(id, {
      isDelete: true,

      deletedAt: new Date(),

      deleteBy: user,
    });
  }
}
