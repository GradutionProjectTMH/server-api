import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransactionService } from 'src/apis/transaction/transaction.service';
import {
  responseError,
  responseSuccess,
  responseSuccessWithData,
} from '../../base/base.controller';
import { Auth } from '../../core/decorators/auth.decorator';
import { User } from '../../core/decorators/user.decorator';
import { TransactionDto } from './dto/transaction.dto';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({ summary: 'Get all transaction' })
  @Auth()
  @Get()
  async getAll() {
    try {
      const data = await this.transactionService.getAll();
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Get a transaction by id' })
  @Auth()
  @Get(':id')
  async getById(@Param('id') id: string, @User('id') userId: string) {
    try {
      const data = await this.transactionService.getById(id, userId);
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Create a transaction' })
  @Auth()
  @Post()
  async create(@Body() body: TransactionDto, @User('id') userId: string) {
    try {
      const data = await this.transactionService.create(body, userId);
      return responseSuccessWithData(data, 'create transaction success');
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Update a transaction' })
  @Auth()
  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() body: TransactionDto,
    @User('id') userId: string,
  ) {
    try {
      await this.transactionService.updateById(id, body, userId);
      return responseSuccess('Update transaction success');
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Delete a transaction' })
  @Auth()
  @Delete(':id')
  async deleteById(@Param('id') id: string, @User('id') userId: string) {
    try {
      await this.transactionService.deleteById(id, userId);
      return responseSuccess('Delete transaction success');
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }
}
