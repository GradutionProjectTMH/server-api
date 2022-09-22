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
import { Auth } from 'src/core/decorators/auth.decorator';
import { User } from 'src/core/decorators/user.decorator';
import {
  responseError,
  responseSuccessWithData,
} from '../../base/base.controller';
import { ROLE } from '../../core/constants/enum';
import { ProductFilterDto } from './dto/product-filter.dto';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Login' })
  @Get()
  async getAll(@Query() filter: ProductFilterDto) {
    try {
      const data = await this.productService.getAll(filter);
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Login' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const data = await this.productService.getById(id);
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Login' })
  @Auth()
  @Post()
  async create(@Body() product: ProductDto, @User('id') userId: string) {
    try {
      const data = await this.productService.create(product, userId);
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Login' })
  @Auth()
  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() product: ProductDto,
    @User('id') userId: string,
    @User('role') role: ROLE,
  ) {
    try {
      const data = await this.productService.updateById(
        id,
        product,
        userId,
        role,
      );
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Login' })
  @Auth()
  @Delete(':id')
  async deleteById(@Param('id') id: string, @User('id') userId: string) {
    try {
      const data = await this.productService.deleteById(id, userId);

      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }
}
