import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DetailDrawing,
  DetailDrawingSchema,
} from 'src/apis/detail-drawing/detail-drawing.schema';
import { Product, ProductSchema } from '../product/product.schema';
import { DetailDrawingController } from './detail-drawing.controller';
import { DetailDrawingService } from './detail-drawing.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DetailDrawing.name, schema: DetailDrawingSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [DetailDrawingController],
  providers: [DetailDrawingService],
})
export class DetailModule {}
