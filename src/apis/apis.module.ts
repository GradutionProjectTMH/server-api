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
import { DetailModule } from 'src/apis/detail-drawing/detail-drawing.module';
import { UploadModule } from 'src/apis/upload/upload.module';
import { HireModule } from 'src/apis/hire/hire.module';
import { TransactionModule } from 'src/apis/transaction/transaction.module';
import { CoinModule } from 'src/apis/coin/coin.module';
import { EnvironmentModule } from 'src/apis/environment/environment.module';
import { DesignerModule } from 'src/apis/designer/designer.module';
@Module({
  imports: [
    AuthModule,
    UserModule,
    ProjectModule,
    ProductModule,
    OrderModule,
    CommentModule,
    DetailModule,
    UploadModule,
    HireModule,
    TransactionModule,
    CoinModule,
    EnvironmentModule,
    DesignerModule,
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
