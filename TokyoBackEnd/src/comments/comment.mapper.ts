import { Injectable } from '@nestjs/common';
import { CommentDocument } from './comment.schema';
import { GetCommentDto } from './_utils/response/get-comment-dto';
import { UserDocument } from 'src/users/users.schema';
import { CommentWithUserDto } from './_utils/comment-with-user-dto';


@Injectable()
export class CommentMapper {
    toGetCommentWithUserDto = (user: UserDocument, comment: CommentDocument) => ({
        id: comment._id.toString(),
        user_firstname: user.firstname,
        user_lastname: user.lastname,
        manga_id: comment.manga_id,
        title: comment.title,
        message: comment.message
    })


    toGetCommentsWithUsersDto = (tab : CommentWithUserDto[]) : GetCommentDto[] => 
        tab.map(commentAndUser => ({
            id: commentAndUser.infoComment._id.toString(),
            user_firstname: commentAndUser.infoUser.firstname,
            user_lastname: commentAndUser.infoUser.lastname,
            manga_id: commentAndUser.infoComment.manga_id,
            title: commentAndUser.infoComment.title,
            message: commentAndUser.infoComment.message
        }));
    
}