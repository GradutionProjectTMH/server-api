import { Module } from '@nestjs/common';
import { AuthModule } from 'src/apis/auth/auth.module';
import { CommentModule } from 'src/apis/comment/comment.module';
import { OrderModule } from 'src/apis/order/order.module';
import { ProductModule } from 'src/apis/product/product.module';
import { UserModule } from 'src/apis/user/user.module';
@Module({
  imports: [AuthModule, CommentModule, OrderModule, ProductModule, UserModule],
  controllers: [],
  providers: [],
})
export class ApisModule {}
