import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiPayloadTooLargeResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from 'src/apis/user/user.service';
import {
  responseError,
  responseSuccessWithData,
} from '../../base/base.controller';
import { removeFile } from '../../base/services/base.service';
import { ROLE } from '../../core/constants/enum';
import { Auth } from '../../core/decorators/auth.decorator';
import { User } from '../../core/decorators/user.decorator';
import { multerMemoryOption } from '../../core/multer/multer.option';
import { UserDto } from './dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all user' })
  // @Auth(ROLE.ADMIN)
  @Get()
  async getAll() {
    try {
      const data = await this.userService.getAll();
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Get a user by id' })
  @Auth()
  @Get('profile')
  async getById(@User('id') userId: string) {
    try {
      const data = await this.userService.getById(userId);
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Update a user' })
  @Auth()
  @UseInterceptors(FileInterceptor('avatar', multerMemoryOption))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiPayloadTooLargeResponse({
    description: 'The upload files size is greater than 10 MB',
  })
  @Put('avatar')
  async uploadAvatar(
    @User('id') userId: string,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    try {
      const data = await this.userService.uploadAvatar(userId, avatar);
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error.message);
      removeFile(avatar.filename);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Update a user' })
  @Auth()
  @Put(':id')
  async updateById(@Param('id') id: string, @Body() body: UserDto) {
    try {
      const data = await this.userService.updateById(id, body);
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }
}
