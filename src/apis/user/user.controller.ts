import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/apis/user/user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all user' })
  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Get a user by id' })
  @Get(':id')
  async getById() {
    return this.userService.getById();
  }

  @ApiOperation({ summary: 'Create a user' })
  @Post()
  async create() {
    return this.userService.create();
  }

  @ApiOperation({ summary: 'Update a user' })
  @Put(':id')
  async updateById() {
    return this.userService.updateById();
  }

  @ApiOperation({ summary: 'Delete a user' })
  @Delete(':id')
  async deleteById() {
    return await this.userService.deleteById();
  }
}
