import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/apis/user/user.service';
import { responseSuccessWithData } from '../../base/base.controller';
import { UserDto } from './dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all user' })
  @Get()
  async getAll() {
    try {
      const data = await this.userService.getAll();
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error.message);
      return reportError(error.message);
    }
  }

  @ApiOperation({ summary: 'Get a user by id' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const data = await this.userService.getById(id);
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error.message);
      return reportError(error.message);
    }
  }

  @ApiOperation({ summary: 'Update a user' })
  @Put(':id')
  async updateById(@Param('id') id: string, @Body() body: UserDto) {
    try {
      const data = await this.userService.updateById(id, body);
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error.message);
      return reportError(error.message);
    }
  }

  @ApiOperation({ summary: 'Delete a user' })
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    try {
      const data = await this.userService.deleteById(id);
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error.message);
      return reportError(error.message);
    }
  }
}
