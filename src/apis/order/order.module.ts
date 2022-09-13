import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from 'src/apis/order/order.controller';
import { OrderService } from 'src/apis/order/order.service';
import { Order, OrderSchema } from 'src/apis/order/order.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
  controllers: [OrderController],
  providers: [OrderService],
})

export class OrderModule {}
