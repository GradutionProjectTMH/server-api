import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadController } from 'src/apis/upload/upload.controller';
import { UploadService } from 'src/apis/upload/upload.service';
import { Upload, UploadSchema } from 'src/apis/upload/upload.schema';
import { UserService } from '../user/user.service';
import { User, UserSchema } from '../user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Upload.name, schema: UploadSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [UploadController],
  providers: [UploadService, UserService],
  exports: [UploadService, UserService],
})
export class UploadModule {}
