import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  responseError,
  responseSuccess,
  responseSuccessWithData,
} from '../../base/base.controller';
import { Auth } from '../../core/decorators/auth.decorator';
import { User } from '../../core/decorators/user.decorator';
import { OrderFilterDto } from './dto/order-filter.dto';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Get all order' })
  @Auth()
  @Get()
  async getAll() {
    try {
      const data = await this.orderService.getAll();
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Get a order by id' })
  @Auth()
  @Get('/user')
  async getByUser(@User('id') userId: string, @Query() filter: OrderFilterDto) {
    try {
      const data = await this.orderService.getByUser(userId, filter);
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Get a order by id' })
  @Auth()
  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const data = await this.orderService.getById(id);
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Create a order' })
  @Auth()
  @Post()
  async create(@Body() data: OrderDto) {
    try {
      await this.orderService.create(data);
      return responseSuccess('Create order success');
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Update a order' })
  @Auth()
  @Put(':id')
  async updateById(@Param('id') id: string, @Body() data: OrderDto) {
    try {
      await this.orderService.updateById(id, data);
      return responseSuccess('Update order success');
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Delete a order' })
  @Auth()
  @Delete(':id')
  async deleteById() {
    try {
      await this.orderService.deleteById();
      return responseSuccess('Delete order success');
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }
}
