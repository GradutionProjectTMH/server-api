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
  async create(@Body() product: ProductDto, @User('id') idUser: string) {
    try {
      const data = await this.productService.create(product, idUser);
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Login' })
  @Put(':id')
  async updateById(@Param('id') id: string, @Body() product: ProductDto) {
    try {
      const data = await this.productService.updateById(id, product);
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Login' })
  @Delete(':id')
  async deleteById(@Param('id') id: string, @User('id') user: string) {
    try {
      const data = await this.productService.deleteById(id, user);

      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }
}
