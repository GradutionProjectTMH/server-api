import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
  Query,
  Delete,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiPayloadTooLargeResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UploadService } from 'src/apis/upload/upload.service';
import { responseError, responseSuccess } from '../../base/base.controller';
import { Auth } from '../../core/decorators/auth.decorator';
import { User } from '../../core/decorators/user.decorator';
import { multerMemoryOption } from '../../core/multer/multer.option';
import { FileFilterDto } from './dtos/file-filter.dto';

@ApiTags('uploads')
@Controller('uploads')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({ summary: 'Get a upload all' })
  @Get('')
  async getAll(@Query() filter: FileFilterDto) {
    try {
      const data = await this.uploadService.getAll(filter);
      return responseSuccess(data);
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Upload files' })
  @Auth()
  @UseInterceptors(FilesInterceptor('files', null, multerMemoryOption))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiPayloadTooLargeResponse({
    description: 'The upload files size is greater than 10 MB',
  })
  @Post()
  async upload(
    @UploadedFiles() files: Express.Multer.File[],
    @User('id') userId: string,
  ) {
    try {
      const data = await this.uploadService.uploadFiles(files, userId);
      return responseSuccess(data);
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Delete all upload' })
  @Delete()
  async removeAll() {
    try {
      await this.uploadService.removeAll();
      return responseSuccess('Delete all success!');
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }
}
