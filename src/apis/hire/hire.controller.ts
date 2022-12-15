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
import { HireService } from 'src/apis/hire/hire.service';
import { responseError, responseSuccess } from '../../base/base.controller';
import { ROLE } from '../../core/constants/enum';
import { Auth } from '../../core/decorators/auth.decorator';
import { User } from '../../core/decorators/user.decorator';
import { HireFilterDto } from './dto/hire-filter.dto';
import { HireDto } from './dto/hire.dto';

@ApiTags('hire')
@Controller('hire')
export class HireController {
  constructor(private readonly hireService: HireService) {}

  @ApiOperation({ summary: 'Get all hire' })
  @Auth()
  @Get()
  async getAll(
    @Query() filter: HireFilterDto,
    @User('id') userId: string,
    @User('role') userRole: ROLE,
  ) {
    try {
      const data = await this.hireService.getAll(filter, userId, userRole);
      return responseSuccess(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Get a hire by id' })
  @Auth()
  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const data = await this.hireService.getById(id);
      return responseSuccess(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Create a hire' })
  @Auth()
  @Post()
  async create(@Body() data: HireDto, @User('id') userId: string) {
    try {
      await this.hireService.create(data, userId);
      return responseSuccess('Create hire success');
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Update a hire' })
  @Auth()
  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() data: HireDto,
    @User('id') userId: string,
  ) {
    try {
      await this.hireService.updateById(id, data, userId);
      return responseSuccess('Update hire success');
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Delete a hire' })
  @Auth()
  @Delete(':id')
  async deleteById(@Param('id') id: string, @User('id') userId: string) {
    try {
      await this.hireService.deleteById(id, userId);
      return responseSuccess('Delete hire success');
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }
}
