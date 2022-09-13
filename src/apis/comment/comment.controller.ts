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
import {
  responseError,
  responseSuccess,
  responseSuccessWithData,
} from '../../base/base.controller';
import { CommentService } from './comment.service';
import { CommentFilterDto } from './dto/comment-filter.dto';
import { CommentDto } from './dto/comment.dto';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'Get all comment by id product' })
  @Get()
  async getAll(@Query() filter: CommentFilterDto) {
    try {
      const data = await this.commentService.getAll();
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Get a comment by id' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const data = await this.commentService.getById(id);
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Create a comment' })
  @Post()
  async create(@Body() data: CommentDto) {
    try {
      await this.commentService.create(data);
      return responseSuccess('Create comment success');
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Update a comment' })
  @Put(':id')
  async updateById(@Param('id') id: string, @Body() data: CommentDto) {
    try {
      await this.commentService.updateById(id, data);
      return responseSuccess('Update comment success');
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Delete a comment' })
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    try {
      await this.commentService.deleteById(id);
      return responseSuccess('Delete comment success');
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }
}
