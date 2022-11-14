import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { responseError, responseSuccess } from '../../base/base.controller';
import { ROLE } from '../../core/constants/enum';
import { Auth } from '../../core/decorators/auth.decorator';
import { User } from '../../core/decorators/user.decorator';
import { OrderFilterDto } from './dto/order-filter.dto';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Get all order by user' })
  @Auth()
  @Get()
  async getAllByUser(@Query() filter: OrderFilterDto) {
    try {
      const data = await this.orderService.getAll(filter);
      return responseSuccess(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Get a order by seller' })
  @Auth(ROLE.SELLER)
  @Get('/seller')
  async getBySeller(
    @User('id') userId: string,
    @Query() filter: OrderFilterDto,
  ) {
    try {
      const data = await this.orderService.getBySeller(userId, filter);
      return responseSuccess(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Get a order by user' })
  @Auth(ROLE.USER)
  @Get('/user')
  async getByUser(@User('id') userId: string, @Query() filter: OrderFilterDto) {
    try {
      const data = await this.orderService.getByUser(userId, filter);
      return responseSuccess(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Get a order by id' })
  @Auth()
  @Get(':id')
  async getById(@Param('id') id: string, @User('id') userId: string) {
    try {
      const data = await this.orderService.getById(id, userId);
      return responseSuccess(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Create a order' })
  @Auth()
  @Post()
  async create(@Body() data: OrderDto, @User('id') userId: string) {
    try {
      await this.orderService.create(data, userId);
      return responseSuccess('Create order success');
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Update a order' })
  @Auth()
  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() data: OrderDto,
    @User('id') userId: string,
    @User('role') role: ROLE,
  ) {
    try {
      await this.orderService.updateById(id, data, userId, role);
      return responseSuccess('Update order success');
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Delete a order' })
  @Auth()
  @Delete(':id')
  async deleteById(@Param('id') id: string, @User('id') userId: string) {
    try {
      await this.orderService.deleteById(id, userId);
      return responseSuccess('Delete order success');
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }
}
