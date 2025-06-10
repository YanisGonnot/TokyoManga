import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

import { CommentRepository } from '../comment.repository';
import { CommentDocument } from '../comment.schema';


@Injectable()
export class CommentByIdPipe implements PipeTransform<string, Promise<CommentDocument>> {
  constructor(private commentRepository: CommentRepository) {}

  transform(commentId: string) {
    if (!Types.ObjectId.isValid(commentId)) throw new BadRequestException('INVALID_COMMENT_ID');
    return this.commentRepository.findOneByIdOrThrow(commentId);
  }
}