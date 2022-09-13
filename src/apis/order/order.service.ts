import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { pagination } from '../../base/base.service';
import { ORDER_STATUS } from '../../core/constants/enum';
import { OrderFilterDto } from './dto/order-filter.dto';
import { OrderDto } from './dto/order.dto';
import { Order, OrderDocument } from './order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  async getAll() {
    return this.orderModel
      .find()
      .populate('productIds', '-createdAt -updatedAt')
      .populate('userId', '-createdAt -updatedAt');
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

  async getById(id: string) {
    return this.orderModel
      .findById(id)
      .populate('productIds', '-createdAt -updatedAt')
      .populate('userId', '-createdAt -updatedAt');
  }

  async create(data: OrderDto) {
    data.status = ORDER_STATUS.PENDDING;
    const newOrder = new this.orderModel(data);
    return newOrder.save();
  }

  async updateById(id: string, data: OrderDto) {
    const order = await this.orderModel.findById(id).lean();

    if (!order) throw new Error('Order does not exist');
    if (order.status !== ORDER_STATUS.PENDDING)
      throw new Error('Can not edit order');

    return this.orderModel.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true },
    );
  }

  async deleteById() {
    return;
  }
}
