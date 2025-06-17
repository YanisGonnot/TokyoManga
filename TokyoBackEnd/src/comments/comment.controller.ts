import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiNoContentResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { ConnectedUser } from 'src/users/_utils/decorator/connecter-user.decorator';
import { UserDocument } from 'src/users/users.schema';
import { PostCommentDto } from './_utils/request/post-comment-dto';
import { Protect } from 'src/auth/_utils/decorator/protect.decorator';
import { Types } from 'mongoose';
import { CommentByIdPipe } from './_utils/comment-by-id.pipe';
import { CommentDocument } from './comment.schema';



@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) { }


  @Protect()
  @Post(':mangaId/comment')
  @ApiOperation({summary: 'Poster un commentaire sur un manga avec l\'utilisateur connecté'})
  @ApiParam({ type: 'number', name: 'mangaId' })
  postComment(
    @ConnectedUser() user: UserDocument,
    @Body() body: PostCommentDto
  ) {
    return this.commentService.postComment(user, body);
  }



  @Get(':mangaId/comment')
  @ApiParam({type: 'number', name: 'mangaId'})
  @ApiOperation({summary: 'Récupère les commentaires liés à un manga'})
  getComments(
    @Param('mangaId') mangaId: number
  ) {
    return this.commentService.getComments(mangaId);
  }


  @Protect()
  @Delete(':commentId/delete')
  @ApiParam({ type: 'string', name: 'commentId' })
  @ApiOperation({ summary: 'Delete comment' })
  @ApiNoContentResponse({ description: 'Comment deleted.' })
  deleteComment(
    @ConnectedUser() user: UserDocument, 
    @Param('commentId', CommentByIdPipe) comment: CommentDocument
  ) {
    return this.commentService.deleteComment(user, comment);
  }

}
