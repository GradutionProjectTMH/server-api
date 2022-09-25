import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/apis/user/user.controller';
import { UserService } from 'src/apis/user/user.service';
import { User, UserSchema } from 'src/apis/user/user.schema';
import { S3UploadService } from '../../base/services/s3upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, S3UploadService],
})
export class UserModule {}
