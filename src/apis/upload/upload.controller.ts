import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
  Query,
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
    return this.uploadService.getAll(filter);
  }

  @ApiOperation({ summary: 'Get all upload' })
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
    return this.uploadService.uploadFiles(files, userId);
  }
}
