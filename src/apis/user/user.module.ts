import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/apis/user/user.controller';
import { UserService } from 'src/apis/user/user.service';
import { User, UserSchema } from 'src/apis/user/user.schema';
import { UploadService } from '../upload/upload.service';
import { Upload, UploadSchema } from '../upload/upload.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Upload.name, schema: UploadSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UploadService],
})
export class UserModule {}
