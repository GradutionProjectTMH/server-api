import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from 'src/apis/user/user.schema';
import { logoToolDesign } from '../../utils/tool-design';
import { pagination, removeKeyUndefined } from '../../utils/utils';
import { FILE_STATUS } from '../upload/enums/file-status.enum';
import { UploadService } from '../upload/upload.service';
import { UserFilterDto } from './dto/user-filter.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @Inject(forwardRef(() => UploadService))
    private readonly uploadService: UploadService,
  ) {}

  async getAll(filter: UserFilterDto) {
    const { limit, page, typeUser } = filter;

    const query: FilterQuery<User> = {};

    if (typeUser) query.role = typeUser;

    const countDocument = this.userModel.countDocuments(query);
    const userQuery = this.userModel
      .find(query)
      .skip(page * limit - limit)
      // .sort(sort)
      .limit(limit);

    const [total, users] = await Promise.all([countDocument, userQuery]);

    return {
      totalPage: pagination(total, limit),
      currentPage: page,
      data: users,
    };
  }

  async getById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new Error('User  not found');

    return user;
  }

  async updateProfile(data: UserDto, userId: string) {
    const userInstance = plainToInstance(User, data);

    if (data.profile && Array.isArray(data.profile.projects)) {
      userInstance.profile.projects = data.profile.projects.map((project) => {
        return {
          tool: {
            name: project.tool,
            logo: logoToolDesign[project.tool],
          },
          url: project.url,
        };
      });
    }

    removeKeyUndefined(userInstance);

    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { ...userInstance, updatedAt: new Date() },
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
