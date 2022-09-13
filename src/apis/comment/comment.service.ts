import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './comment.schema';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async getAll() {
    return (
      this.commentModel
        .find()
        // .populate('productId', '-createdAt -updatedAt')
        .populate('userId', '-createdAt -updatedAt')
    );
  }

  async getById(id: string) {
    return (
      this.commentModel
        .findById(id)
        // .populate('productId', '-createdAt -updatedAt')
        .populate('userId', '-createdAt -updatedAt')
    );
  }

  async create(data: CommentDto) {
    const newComment = new this.commentModel(data);
    return newComment.save();
  }

  async updateById(id: string, data: CommentDto) {
    const comment = await this.commentModel.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true },
    );

    if (!comment) throw new Error('Can not update comment');
    return comment;
  }

  async deleteById(id: string) {
    const comment = await this.commentModel.findByIdAndDelete(id);

    if (!comment) throw new Error('Can not delete comment');

    return comment;
  }
}
