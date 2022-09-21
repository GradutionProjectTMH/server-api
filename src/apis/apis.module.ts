import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from 'src/apis/auth/auth.module';
import { CommentModule } from 'src/apis/comment/comment.module';
import { OrderModule } from 'src/apis/order/order.module';
import { ProductModule } from 'src/apis/product/product.module';
import { UserModule } from 'src/apis/user/user.module';
import { LoggerMiddleware } from '../core/middleware/logger.middleware';
import { ProjectModule } from 'src/apis/project/project.module';
@Module({
  imports: [
    AuthModule,
    UserModule,
    ProjectModule,
    ProductModule,
    OrderModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class ApisModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
