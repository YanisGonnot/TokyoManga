import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { CommentDocument, Comment } from './comment.schema';
import { PostCommentDto } from './_utils/request/post-comment-dto';



@Injectable()
export class CommentRepository {
  private readonly commentNotFound = new NotFoundException('Comment not found');
  public readonly commentAlreadyDeleted = new BadRequestException('User has already delete his comment on this manga');
  public readonly deleteCommentNotAuthorized = new BadRequestException('This user has not permission to delete this comment');

  constructor(
    @InjectModel(Comment.name) private model: Model<CommentDocument>,
  ) { }


    findOneByIdOrThrow = (commentId: string) => this.model.findById(commentId).orFail(this.commentNotFound).exec();


    findByUserAndMangaOrThrow = (userId: Types.ObjectId, mangaId: string) => 
      this.model
        .findOne({
          user_id: userId, 
          manga_id: mangaId
        })
        .orFail(this.commentNotFound)
        .exec();
  
    
    findCommentsByManga = (mangaId: number) => 
      this.model.find({
        manga_id: mangaId.toString()
      })
      .orFail(this.commentNotFound)
      .exec();


    findByUserAndCommentId = (userId: Types.ObjectId, commentId: Types.ObjectId) => 
      this.model
        .findById({
          user_id: userId,
          _id: commentId
        })
        .orFail(this.commentNotFound)
        .exec();


        
    postComment = (userId: Types.ObjectId, newComment: PostCommentDto) => 
      this.model.create({
        user_id: userId,
        manga_id: newComment.mangaId,
        title: newComment.title,
        message: newComment.message,
        score: newComment.score,
        reactions: newComment.reactions
      });



    updateComment = (comment: CommentDocument, updateComment: PostCommentDto) => 
      this.model.findByIdAndUpdate(
        comment._id, {
          title: updateComment.title,
          message: updateComment.message,
          score: updateComment.score,
          reactions: updateComment.reactions
        }
      ).exec()    

    
    
    delete = (comment: CommentDocument) =>
      this.model.deleteOne(comment._id).exec();
}
