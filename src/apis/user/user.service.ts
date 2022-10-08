import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/apis/user/user.schema';
import { FILE_STATUS } from '../upload/enums/file-status.enum';
import { UploadService } from '../upload/upload.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @Inject(forwardRef(() => UploadService))
    private readonly uploadService: UploadService,
  ) {}

  async getAll() {
    return this.userModel.find();
  }

  async getById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new Error('User  not found');

    return user;
  }

  async updateProfile(data: UserDto, userId: string) {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { ...data, updatedAt: new Date() },
      { new: true },
    );

    if (!user) throw new Error('User not found');
    return user;
  }

  async uploadAvatar(userId: string, avatar: Express.Multer.File) {
    const user = await this.userModel.findById(userId).lean();

    if (!user) throw new Error('User not found');

    const file = await this.uploadService.uploadFiles(
      [avatar],
      userId,
      FILE_STATUS.USING,
    );

    await this.userModel.updateOne({ _id: userId }, { avatar: file[0] });

    if (user.avatar) {
      this.uploadService.updateFileStatus([
        { location: user.avatar, status: FILE_STATUS.NON_USED },
      ]);
    }

    return { ...user, avatar: file[0] };
  }
}
