
import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/apis/auth/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Get all auth' })
  @Get()
  async getAll() {
    return this.authService.getAll();
  }

  @ApiOperation({ summary: 'Get a auth by id' })
  @Get(':id')
  async getById() {
    return this.authService.getById();
  }

  @ApiOperation({ summary: 'Create a auth' })
  @Post()
  async create() {
    return this.authService.create();
  }

  @ApiOperation({ summary: 'Update a auth' })
  @Put(':id')
  async updateById() {
    return this.authService.updateById();
  }

  @ApiOperation({ summary: 'Delete a auth' })
  @Delete(':id')
  async deleteById() {
    return await this.authService.deleteById();
  }
}
  