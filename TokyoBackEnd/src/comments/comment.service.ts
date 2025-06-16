import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

import { CommentRepository } from './comment.repository';
import { CommentMapper } from './comment.mapper';
import { PostCommentDto } from './_utils/request/post-comment-dto';
import { CommentDocument } from './comment.schema';
import { UserDocument } from 'src/users/users.schema';
import { UsersRepository } from 'src/users/users.repository';
import { UsersMapper } from 'src/users/users.mapper';
import { CommentWithUserDto } from './_utils/comment-with-user-dto';




@Injectable()
export class CommentService {

  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly commentMapper: CommentMapper,
    private readonly userRepository: UsersRepository,
    private readonly userMapper: UsersMapper
  ) { }


  postComment = async (user: UserDocument, bodyComment: PostCommentDto) => {
    try {
      const comment = await this.commentRepository
        .findByUserAndMangaOrThrow(user.id, bodyComment.mangaId);
      return this.commentRepository.updateComment(comment, bodyComment);
    }
    catch (error: any) {
      return this.commentRepository
        .postComment(user.id!, bodyComment)
        .then((newComment) => this.commentMapper.toGetCommentWithUserDto(user, newComment));
    }
  }


  getComments = async (mangaId: number) => {
    try {
      const comments = await this.commentRepository.findCommentsByManga(mangaId);

      // On résout toutes les promesses de mapping avec Promise.all
      const commentsWithUsers: CommentWithUserDto[] = await Promise.all(
        comments.map(async comment => {
          const user = await this.userRepository.findOneById(comment.user_id.toString());
          return {
            infoComment: comment,
            infoUser: user!
          };
        })
      );

      // Une fois toutes les promesses résolues, on les envoie au mapper
      return this.commentMapper.toGetCommentsWithUsersDto(commentsWithUsers);
    }
    catch(error: any) {
      return [];
    }
  }


  deleteComment = async (user: UserDocument, comment: CommentDocument) => {
      if (comment.user_id.toString() === user._id.toString()) {
        return this.commentRepository.delete(comment);
      }
      else {
        return this.commentRepository.deleteCommentNotAuthorized.message;
      }
    }
  }
