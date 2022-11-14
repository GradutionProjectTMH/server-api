import {
  Injectable,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Upload, UploadDocument } from 'src/apis/upload/upload.schema';
import * as AWS from 'aws-sdk';
import { readFileSync } from 'fs';
import { FILE_STATUS } from './enums/file-status.enum';
import { FileFilterDto } from './dtos/file-filter.dto';
import { UserService } from '../user/user.service';
import { FileDto } from './dtos/file.dto';
import { pagination } from '../../utils/utils';

interface File {
  key: string;
}

@Injectable()
export class UploadService {
  private s3 = new AWS.S3({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
    region: process.env.AWS_BUCKET_REGION,
  });

  constructor(
    @InjectModel(Upload.name)
    private readonly uploadModel: Model<UploadDocument>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async uploadFiles(
    files: Express.Multer.File[],
    userId: string,
    status = FILE_STATUS.NON_USED,
  ) {
    const fileS3s = await this.s3UploadMultiple(files);
    const newUploads: Upload[] = fileS3s.map((file) => {
      return {
        userId,
        bucket: file.Bucket,
        etag: file.ETag,
        key: file.Key,
        location: file.Location,
        status,
      };
    });

    const result = await this.uploadModel.insertMany(newUploads);

    return result.map((e) => {
      return e.location;
    });
  }

  async getAll(filter: FileFilterDto) {
    const { status, userId, limit, page } = filter;

    const query: FilterQuery<UploadDocument> = {};
    if (status) query.status = status;
    if (userId) {
      await this.userService.getById(userId);
      query.userId = userId;
    }

    const countDocument = this.uploadModel.countDocuments(query);
    const getUpload = this.uploadModel
      .find(query)
      .skip(page * limit - limit)
      // .sort({})
      .limit(limit);

    const [total, uploads] = await Promise.all([countDocument, getUpload]);

    return {
      totalPage: pagination(total, limit),
      currentPage: page,
      data: uploads,
    };
  }

  async updateFileStatus(files: FileDto[]) {
    const func = files.map((f) => {
      return this.uploadModel.updateOne(
        { location: f.location },
        { status: f.status },
      );
    });
    await Promise.all(func).catch((err) => console.log(err));
    return;
  }

  async removeAll() {
    const files = await this.uploadModel
      .find({
        status: FILE_STATUS.NON_USED,
        createdAt: {
          // $lte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
          $lte: new Date(new Date().getTime()),
        },
      })
      .lean();

    if (Array.isArray(files) && files.length === 0) return;
    await this.deleteFiles(files);

    return this.uploadModel.deleteMany({
      status: FILE_STATUS.NON_USED,
      createdAt: {
        // $lte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        $lte: new Date(new Date().getTime()),
      },
    });
  }

  private async s3Upload(file: Express.Multer.File) {
    try {
      const params: AWS.S3.PutObjectRequest = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key:
          file.filename ||
          `${
            Date.now() + '-' + Math.round(Math.random() * 1e9)
          }.${file.originalname.split('.').pop()}`,
        Body: file.path ? readFileSync(file.path) : file.buffer,
        ContentType: file.mimetype,
      };

      const data = await this.s3.upload(params).promise();

      return data;
    } catch (error) {
      console.log('error', error);
      throw new BadRequestException('File upload failed');
    }
  }

  private async s3UploadMultiple(files: Array<Express.Multer.File>) {
    const params = files.map((file) => {
      return {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key:
          file.filename ||
          `${
            Date.now() + '-' + Math.round(Math.random() * 1e9)
          }.${file.originalname.split('.').pop()}`,
        Body: file.path ? readFileSync(file.path) : file.buffer,
        ContentType: file.mimetype,
      };
    });

    try {
      const data = await Promise.all(
        params.map((params) => this.s3.upload(params).promise()),
      );

      return data;
    } catch (error) {
      console.log('error', error);
      throw new BadRequestException('File upload failed');
    }
  }

  private deleteFile(file: File) {
    const params: AWS.S3.DeleteObjectRequest = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.key,
    };

    return new Promise((resolve, reject) => {
      this.s3.deleteObject(params, (err, data) => {
        if (err) {
          console.log('Delete file in s3 failed', err.message);
          return reject(false);
        }
        console.log('Delete file in s3 success', data);

        return resolve(true);
      });
    });
  }

  private deleteFiles(files: Array<File>) {
    const Keys = files.map((file) => {
      return {
        Key: file.key,
      };
    });

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Delete: { Objects: Keys },
    };

    return new Promise((resolve, reject) => {
      this.s3.deleteObjects(params, (err, data) => {
        if (err) {
          console.log('Delete file in s3 failed', err.message);
          return reject(err);
        }
        console.log('Delete file in s3 success', data);

        return resolve(data);
      });
    });
  }
}
