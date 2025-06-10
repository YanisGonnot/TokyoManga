import { UserDocument } from 'src/users/users.schema';
import { CommentDocument } from '../comment.schema';

export interface CommentWithUserDto {
    infoComment: CommentDocument,
    infoUser: UserDocument
};