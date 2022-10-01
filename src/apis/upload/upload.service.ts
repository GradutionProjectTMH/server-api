import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Upload, UploadDocument } from 'src/apis/upload/upload.schema';
import * as AWS from 'aws-sdk';
import { readFileSync } from 'fs';
import { S3UploadService } from '../../base/services/s3upload.service';
import { FILE_STATUS } from './enums/file-status.enum';
import { FileFilterDto } from './dtos/file-filter.dto';
import { UserService } from '../user/user.service';
import { pagination } from '../../base/services/base.service';

interface File {
  Key: string;
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
    private readonly s3UploadService: S3UploadService,
    private readonly userService: UserService,
  ) {}

  async uploadFiles(files: Express.Multer.File[], userId: string) {
    const fileS3s = await this.s3UploadService.s3UploadMultiple(files);
    const newUploads: Upload[] = fileS3s.map((file) => {
      return {
        userId,
        bucket: file.Bucket,
        etag: file.ETag,
        key: file.Key,
        location: file.Location,
        status: FILE_STATUS.NON_USED,
      };
    });

    return this.uploadModel.insertMany(newUploads);
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

  // async updateStatus(location: string[], status: FILE_STATUS, userId: string) {
  //   const upload = await this.uploadModel.findOne({ location }).lean();
  //   if (!upload) return;
  //   if (upload.userId !== userId) {
  //     throw new Error('You can not update ');
  //   }

  //   return this.uploadModel.up;
  // }

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

  deleteFile(file: File) {
    const params: AWS.S3.DeleteObjectRequest = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.Key,
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

  deleteFiles(files: Array<File>) {
    const Keys = files.map((file) => {
      return {
        Key: file.Key,
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
