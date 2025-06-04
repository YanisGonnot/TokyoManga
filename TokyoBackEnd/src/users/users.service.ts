import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './_utils/dto/request/create-user.dto';
import { UsersMapper } from './users.mapper';
import { UsersRepository } from './users.repository';
import { UserDocument } from './users.schema';
import { EditDto } from './_utils/dto/request/edit-user-dto';


@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersMapper: UsersMapper,
  ) {}

  createUser = (createUserDto: CreateUserDto) =>
    this.usersRepository.createUser(createUserDto).then(this.usersMapper.toGetUserDto);

  getUser(user: UserDocument) {
    return this.usersMapper.toGetUserDto(user);
  }

  deleteUser = (user: UserDocument) => this.usersRepository.deleteUser(user);

  //
  editUser = async (token: string, body: EditDto) => {
    const user = await this.usersRepository.findOneByTokenOrThrow(token);
    return this.usersRepository.editUser(user, body);
  };
}
