import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from 'src/apis/order/order.controller';
import { OrderService } from 'src/apis/order/order.service';
import { Order, OrderSchema } from 'src/apis/order/order.schema';
import { ProductService } from '../product/product.service';
import { Product, ProductSchema } from '../product/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, ProductService],
})
export class OrderModule {}
