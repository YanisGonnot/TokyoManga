import { Injectable } from '@nestjs/common';
import { GetUserDto } from './_utils/dto/response/get-user.dto';
import { UserDocument } from './users.schema';

@Injectable()
export class UsersMapper {
  toGetUserDto = (user: UserDocument): GetUserDto => ({
    id: user._id.toString(),
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
  });
}
