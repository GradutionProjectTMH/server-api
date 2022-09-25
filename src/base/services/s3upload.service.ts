import { BadRequestException, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { readFileSync } from 'fs';

interface File {
  Key: string;
}

@Injectable()
export class S3UploadService {
  private s3 = new AWS.S3({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
    region: process.env.AWS_BUCKET_REGION,
  });

  async s3Upload(file: Express.Multer.File) {
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

  async s3UploadMultiple(files: Array<Express.Multer.File>) {
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
