import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiPayloadTooLargeResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/core/decorators/auth.decorator';
import { User } from 'src/core/decorators/user.decorator';
import {
  responseError,
  responseSuccessWithData,
} from '../../base/base.controller';
import { removeFile } from '../../base/base.service';
import { ROLE } from '../../core/constants/enum';
import { multerOption } from '../../core/multer/multer.option';
import { ProductFilterDto } from './dto/product-filter.dto';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Get all product' })
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

  @ApiOperation({ summary: 'Get product by id' })
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

  @ApiOperation({ summary: 'Create product' })
  @Auth()
  @UseInterceptors(FilesInterceptor('files', 20, multerOption))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        star: { type: 'number' },
        oldPrice: { type: 'number' },
        price: { type: 'number' },
        sale: { type: 'number' },
        description: { type: 'string' },
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiPayloadTooLargeResponse({
    description: 'The upload files size is greater than 10 MB',
  })
  @Post()
  async create(
    @Body() product: ProductDto,
    @User('id') userId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      const data = await this.productService.create(product, userId, files);
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error);
      files.forEach((file) => removeFile(file.filename));
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Update product by id' })
  @Auth()
  @UseInterceptors(FilesInterceptor('files', 20, multerOption))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        star: { type: 'number' },
        oldPrice: { type: 'number' },
        price: { type: 'number' },
        sale: { type: 'number' },
        description: { type: 'string' },
        images: { type: 'array', items: { type: 'string' } },
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiPayloadTooLargeResponse({
    description: 'The upload files size is greater than 10 MB',
  })
  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() product: ProductDto,
    @User('id') userId: string,
    @User('role') role: ROLE,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      const data = await this.productService.updateById(
        id,
        product,
        userId,
        role,
        files,
      );
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error);
      files.forEach((file) => removeFile(file.filename));
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Delete product by id' })
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
