import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { FilterQuery, Model } from 'mongoose';
import {
  pagination,
  removeFile,
  removeKeyUndefined,
} from '../../base/base.service';
import {
  LIMIT,
  PAGE,
  PRODUCT_SORT,
  PRODUCT_STATUS,
  ROLE,
} from '../../core/constants/enum';
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

  async create(data: ProductDto, userId: string, files: Express.Multer.File[]) {
    const images = files.map(
      (file) => `${process.env.APP_URL}${file.filename}`,
    );

    const productInstance = plainToInstance(Product, data);

    productInstance.status = PRODUCT_STATUS.PENDDING;
    productInstance.images = images;
    productInstance.createdBy = userId;

    const newProduct = new this.productModel(productInstance);
    return newProduct.save();
  }

  async updateById(
    id: string,
    data: ProductDto,
    userId: string,
    role: ROLE,
    files: Express.Multer.File[],
  ) {
    const product = await this.productModel.findById(id).lean();

    if (!product) throw new Error('Product id does not exist');

    console.log(product.createdBy.toString());

    if (product.createdBy.toString() !== userId) {
      throw new Error('You can not update product');
    }

    const productInstance = plainToInstance(Product, data);

    const images = files.map(
      (file) => `${process.env.APP_URL}${file.filename}`,
    );

    if (!Array.isArray(productInstance.images)) {
      productInstance.images = (productInstance.images as string)
        .split(',')
        .map((v) => v.trim());
    }

    productInstance.images = [...productInstance.images, ...images];

    if (role !== ROLE.ADMIN) {
      delete productInstance.status;
    }

    removeKeyUndefined(productInstance);

    const productUpdate = await this.productModel.findByIdAndUpdate(
      id,
      { ...productInstance, updatedAt: new Date() },
      { new: true },
    );

    product.images.forEach((image) => {
      if (!productUpdate.images.includes(image)) {
        removeFile(image);
      }
    });

    return productUpdate;
  }

  async deleteById(id: string, userId: string) {
    const product = await this.productModel.findById(id).lean();

    if (!product) throw new Error('Product id does not exist');

    if (product.createdBy !== userId)
      throw new Error('You can not update product');

    return this.productModel.findByIdAndUpdate(id, {
      isDelete: true,

      deletedAt: new Date(),

      deleteBy: userId,
    });
  }
}
