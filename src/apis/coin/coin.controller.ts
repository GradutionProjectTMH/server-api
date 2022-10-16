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
import {
  responseError,
  responseSuccess,
  responseSuccessWithData,
} from '../../base/base.controller';
import { Auth } from '../../core/decorators/auth.decorator';
import { CoinService } from './coin.service';
import { CoinDto } from './dto/coin.dto';

@ApiTags('coins')
@Controller('coins')
export class CoinController {
  constructor(private readonly coinService: CoinService) {}

  @ApiOperation({ summary: 'Get all coin' })
  @Auth()
  @Get()
  async getAll() {
    try {
      const data = await this.coinService.getAll();
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Get a coin by id' })
  @Auth()
  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const data = await this.coinService.getById(id);
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Create a coin' })
  @Auth()
  @Post()
  async create(@Body() body: CoinDto) {
    try {
      const data = await this.coinService.create(body);
      return responseSuccessWithData(data, 'create coin success');
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Update a coin' })
  @Auth()
  @Put(':id')
  async updateById(@Param('id') id: string, @Body() body: CoinDto) {
    try {
      await this.coinService.updateById(id, body);
      return responseSuccess('Update coin success');
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Delete a coin' })
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    try {
      await this.coinService.deleteById(id);
      return responseSuccess('Delete coin success');
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }
}
