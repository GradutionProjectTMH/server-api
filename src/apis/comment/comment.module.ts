import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentController } from 'src/apis/comment/comment.controller';
import { CommentService } from 'src/apis/comment/comment.service';
import { Comment, CommentSchema } from 'src/apis/comment/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
