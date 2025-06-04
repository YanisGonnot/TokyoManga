import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { CommentDocument } from './comment.schema';



@Injectable()
export class CommentRepository {
  private readonly commentNotFound = new NotFoundException('Comment not found');
  public readonly commentAlreadyExist = new BadRequestException('User already comment this manga');
  public readonly commentAlreadyDeleted = new BadRequestException('User has already delete his comment on this manga');

  constructor(
    @InjectModel(Comment.name) private model: Model<CommentDocument>,
  ) { }


  

}
