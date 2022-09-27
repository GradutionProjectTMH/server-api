import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/apis/user/user.schema';
import { S3UploadService } from '../../base/services/s3upload.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly s3UploadService: S3UploadService,
  ) {}

  async getAll() {
    return this.userModel.find();
  }

  async getById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new Error('User not found');

    return user;
  }

  async updateById(id: string, data: UserDto) {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true },
    );

    if (!user) throw new Error('User not found');
    return user;
  }

  async uploadAvatar(userId: string, avatar: Express.Multer.File) {
    const user = await this.userModel.findById(userId).lean();

    if (!user) throw new Error('User not found');

    const file = await this.s3UploadService.s3Upload(avatar);

    await this.userModel.updateOne({ _id: userId }, { avatar: file.Location });

    if (user.avatar) {
      const fileLocations = user.avatar.split('/');
      this.s3UploadService.deleteFile({
        Key: fileLocations[fileLocations.length - 1],
      });
    }

    return { ...user, avatar: file.Location };
  }
}
