import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { FilterQuery, Model } from 'mongoose';
import {
  pagination,
  removeKeyUndefined,
} from '../../base/services/base.service';
import { ORDER_STATUS, ROLE } from '../../core/constants/enum';
import { ProductService } from '../product/product.service';
import { OrderFilterDto } from './dto/order-filter.dto';
import { OrderDto } from './dto/order.dto';
import { Order, OrderDocument } from './order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    private readonly productService: ProductService,
  ) {}

  async getAll(filter: OrderFilterDto) {
    const { limit, page, q, status } = filter;

    const where: FilterQuery<Order>[] = [{ isDelete: { $ne: true } }];

    if (status) where.push({ status: status });

    return this.orderModel
      .find()
      .populate('productIds', '-createdAt -updatedAt')
      .populate('userId', '-createdAt -updatedAt')
      .skip(page * limit - limit)
      .sort({})
      .limit(limit);
  }

  async getBySeller(userId: string, filter: OrderFilterDto) {
    const { limit, page, q, status } = filter;

    const where: FilterQuery<Order>[] = [
      { isDelete: { $ne: true } },
      { userId },
    ];

    if (status) where.push({ status: status });
    // if (q) where.push({ status: status });

    const query: FilterQuery<Order> = { $and: where };

    const countDocument = this.orderModel.countDocuments(query);
    const getOrder = this.orderModel
      .find(query)
      .populate('productIds', '-createdAt -updatedAt')
      .populate('userId', '-createdAt -updatedAt')
      .skip(page * limit - limit)
      .sort({})
      .limit(limit);

    const [total, orders] = await Promise.all([countDocument, getOrder]);

    return {
      totalPage: pagination(total, limit),
      currentPage: page,
      data: orders,
    };
  }

  async getByUser(userId: string, filter: OrderFilterDto) {
    const { limit, page, q, status } = filter;

    const where: FilterQuery<Order>[] = [
      { isDelete: { $ne: true } },
      { userId },
    ];

    if (status) where.push({ status: status });
    // if (q) where.push({ status: status });

    const query: FilterQuery<Order> = { $and: where };

    const countDocument = this.orderModel.countDocuments(query);
    const getOrder = this.orderModel
      .find(query)
      .populate('productIds', '-createdAt -updatedAt')
      .populate('userId', '-createdAt -updatedAt')
      .skip(page * limit - limit)
      .sort({})
      .limit(limit);

    const [total, orders] = await Promise.all([countDocument, getOrder]);

    return {
      totalPage: pagination(total, limit),
      currentPage: page,
      data: orders,
    };
  }

  async getById(id: string, userId: string) {
    const order = await this.orderModel
      .findById(id)
      .populate('productIds', '-createdAt -updatedAt')
      .populate('userId', '-createdAt -updatedAt');

    if (!order) throw new Error('Order does not exist');

    if (userId !== order.userId) throw new Error('You can not get order');

    return order;
  }

  async create(data: OrderDto, userId: string) {
    const orderInstance = plainToInstance(Order, data);

    orderInstance.status = ORDER_STATUS.PENDDING;
    orderInstance.userId = userId;

    for (const product of orderInstance.products) {
      await this.productService.getById(product.productId);
    }

    const newOrder = new this.orderModel(data);
    return newOrder.save();
  }

  async updateById(id: string, data: OrderDto, userId: string, role: ROLE) {
    const order = await this.orderModel.findById(id).lean();
    if (!order) throw new Error('Order does not exist');

    if (order.userId !== userId) throw new Error('You can not edit order');

    const orderInstance = plainToInstance(Order, data);

    if (role !== ROLE.SELLER) {
      if (order.status !== ORDER_STATUS.PENDDING) {
        throw new Error('You can not edit order');
      }
      delete orderInstance.status;
    }

    removeKeyUndefined(orderInstance);

    return this.orderModel.findByIdAndUpdate(
      id,
      { ...orderInstance, updatedAt: new Date() },
      { new: true },
    );
  }

  async deleteById(id: string, userId: string) {
    const order = await this.orderModel.findById(id).lean();
    if (!order) throw new Error('Order does not exist');

    if (order.userId !== userId) throw new Error('You can not edit order');

    await this.orderModel.deleteOne({ id });

    return order;
  }
}
