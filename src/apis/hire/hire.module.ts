import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HireController } from 'src/apis/hire/hire.controller';
import { HireService } from 'src/apis/hire/hire.service';
import { Hire, HireSchema } from 'src/apis/hire/hire.schema';
import { UserService } from '../user/user.service';
import { User, UserSchema } from '../user/user.schema';
import { S3UploadService } from '../../base/services/s3upload.service';
import { Upload, UploadSchema } from '../upload/upload.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hire.name, schema: HireSchema },
      { name: User.name, schema: UserSchema },
      { name: Upload.name, schema: UploadSchema },
    ]),
  ],
  controllers: [HireController],
  providers: [HireService, UserService, S3UploadService],
})
export class HireModule {}
