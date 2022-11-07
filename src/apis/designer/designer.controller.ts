import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DesignerService } from 'src/apis/designer/designer.service';
import {
  responseError,
  responseSuccessWithData,
} from '../../base/base.controller';
import { Auth } from '../../core/decorators/auth.decorator';
import { User } from '../../core/decorators/user.decorator';
import { DesignerFilterDto } from './dto/designer-filter.dto';
import { DesignerDto } from './dto/designer.dto';

@ApiTags('designer')
@Controller('designer')
export class DesignerController {
  constructor(private readonly designerService: DesignerService) {}

  @ApiOperation({ summary: 'Get all designer' })
  @Get()
  async getAll(@Query() filter: DesignerFilterDto) {
    try {
      const result = await this.designerService.getAll(filter);
      return responseSuccessWithData(result);
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Get a designer by id' })
  @Get(':designerId')
  async getById(@Param('designerId') designerId: string) {
    try {
      const result = await this.designerService.getById(designerId);
      return responseSuccessWithData(result);
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Create a designer' })
  @Auth()
  @Post()
  async create(@Body() data: DesignerDto, @User('id') userId: string) {
    try {
      const result = await this.designerService.create(data, userId);
      return responseSuccessWithData(result);
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Update a designer' })
  @Auth()
  @Put(':designerId')
  async updateById(
    @Param('designerId') designerId: string,
    @Body() data: DesignerDto,
  ) {
    try {
      const result = await this.designerService.updateById(designerId, data);
      return responseSuccessWithData(result);
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Delete a designer' })
  @Auth()
  @Delete(':designerId')
  async deleteById(@Param('designerId') designerId: string) {
    try {
      const result = await this.designerService.deleteById(designerId);
      return responseSuccessWithData(result);
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }
}
