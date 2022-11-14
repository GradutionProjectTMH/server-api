import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EnvironmentService } from 'src/apis/environment/environment.service';
import { responseError, responseSuccess } from '../../base/base.controller';

@ApiTags('environment')
@Controller('environment')
export class EnvironmentController {
  constructor(private readonly environmentService: EnvironmentService) {}

  @ApiOperation({ summary: 'Get all environment' })
  @Get()
  async getAll() {
    try {
      const data = await this.environmentService.getAll();
      return responseSuccess(data);
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Update environment' })
  @Put('')
  async updateById(@Body() body: string) {
    try {
      await this.environmentService.updateById(body);
      return responseSuccess('Update environment success');
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }
}
