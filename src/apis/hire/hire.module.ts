import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HireController } from 'src/apis/hire/hire.controller';
import { HireService } from 'src/apis/hire/hire.service';
import { Hire, HireSchema } from 'src/apis/hire/hire.schema';
import { UserService } from '../user/user.service';
import { User, UserSchema } from '../user/user.schema';
import { Upload, UploadSchema } from '../upload/upload.schema';
import { DetailDrawingService } from '../detail-drawing/detail-drawing.service';
import {
  DetailDrawing,
  DetailDrawingSchema,
} from '../detail-drawing/detail-drawing.schema';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hire.name, schema: HireSchema },
      { name: User.name, schema: UserSchema },
      { name: Upload.name, schema: UploadSchema },
      { name: DetailDrawing.name, schema: DetailDrawingSchema },
    ]),
  ],
  controllers: [HireController],
  providers: [HireService, UserService, UploadService, DetailDrawingService],
})
export class HireModule {}
