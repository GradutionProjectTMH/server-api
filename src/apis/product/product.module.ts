import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from 'src/apis/product/product.controller';
import { ProductService } from 'src/apis/product/product.service';
import { Product, ProductSchema } from 'src/apis/product/product.schema';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    UploadModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [UploadModule, ProductService],
})
export class ProductModule {}
