import { Injectable } from '@nestjs/common';
import { CommentDocument } from './comment.schema';
import { GetCommentDto } from './_utils/response/get-comment-dto';
import { UserDocument } from 'src/users/users.schema';
import { CommentWithUserDto } from './_utils/comment-with-user-dto';
import { GetCommentDtoWithClassTranformer } from './_utils/response/get-comment-dto-with-transformer';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class CommentMapper {
    toGetCommentWithUserDto = (user: UserDocument, comment: CommentDocument): GetCommentDto => ({
        id: comment._id.toString(),
        userFirstname: user.firstname,
        userLastname: user.lastname,
        mangaId: comment.manga_id,
        title: comment.title,
        message: comment.message,
        createdAt: comment.get('createdAt'),
        updatedAt: comment.get('updatedAt')
    })


    toGetCommentsWithUsersDto = (tab: CommentWithUserDto[]): GetCommentDto[] =>
        tab.map(commentAndUser => ({
            id: commentAndUser.infoComment._id.toString(),
            userFirstname: commentAndUser.infoUser.firstname,
            userLastname: commentAndUser.infoUser.lastname,
            mangaId: commentAndUser.infoComment.manga_id,
            title: commentAndUser.infoComment.title,
            message: commentAndUser.infoComment.message,
            createdAt: commentAndUser.infoComment.get('createdAt'),
            updatedAt: commentAndUser.infoComment.get('updatedAt')
        }));


    toGetCommentWithClassTransformer = (user: UserDocument, comment: CommentDocument) =>
        plainToInstance(GetCommentDtoWithClassTranformer, {
            id: comment._id.toString(),
            userFirstname: user.firstname,
            userLastname: user.lastname,
            mangaId: comment.manga_id,
            title: comment.title,
            message: comment.message,
            createdAt: comment.get('createdAt'),
            updatedAt: comment.get('updatedAt')
        });


    toGetCommentsArrayWithClassTransformer = (tab: CommentWithUserDto[]) =>{
        const list = tab.map(commentAndUser => ({
            id: commentAndUser.infoComment._id.toString(),
            userFirstname: commentAndUser.infoUser.firstname,
            userLastname: commentAndUser.infoUser.lastname,
            mangaId: commentAndUser.infoComment.manga_id,
            title: commentAndUser.infoComment.title,
            message: commentAndUser.infoComment.message,
            createdAt: commentAndUser.infoComment.get('createdAt'),
            updatedAt: commentAndUser.infoComment.get('updatedAt')
        }));
        console.log("List", list)
        return plainToInstance(GetCommentDtoWithClassTranformer, list);
    }
}