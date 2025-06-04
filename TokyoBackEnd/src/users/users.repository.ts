import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { CreateUserDto } from './_utils/dto/request/create-user.dto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import dayjs from 'dayjs';
import { EncryptionService } from 'src/encryption/encryption.service';
import { EditDto } from './_utils/dto/request/edit-user-dto';

@Injectable()
export class UsersRepository {
  private readonly orFailNotFound = new NotFoundException('User not found');
  

  constructor(
    @InjectModel(User.name) private model: Model<UserDocument>,
    private readonly encryptionService: EncryptionService,
  ) {}

  findOneById = (id: string) => this.model.findById(id).exec();

  findOneByIdOrThrow = (id: string) => {
    return this.model.findById(id).orFail(this.orFailNotFound).exec();
  }

  findOneByEmailOrThrow = (email: string) =>
    this.model.findOne({ email: email, deletedAt: null }).orFail(this.orFailNotFound).exec();

  findOneByTokenOrThrow = (token: string) =>
    this.model
      .findOne({ recoveryToken: token, recoveryTokenExpires: { $gt: new Date() }, deletedAt: null })
      .orFail(this.orFailNotFound)
      .exec();

  updatePasswordById = (id: Types.ObjectId, password: string) =>
    this.model
      .findByIdAndUpdate(id, {
        password: this.encryptionService.encrypt(password),
        recoveryToken: null,
        recoveryTokenExpires: null,
      })
      .exec();

  userWithEmailExists = (email: string) => this.model.exists({ email: email, deletedAt: null }).exec();

  recoverAccountPassword = (email: string) =>
    this.model
      .findOneAndUpdate(
        { email: email },
        { recoveryToken: randomStringGenerator(), recoveryTokenExpires: dayjs().add(5, 'm').toDate() },
        { new: true },
      )
      .orFail(this.orFailNotFound)
      .exec();

  createUser(createUserDto: CreateUserDto) {
    const hashPassword = this.encryptionService.encrypt(createUserDto.password);

    return this.model.create({
      email: createUserDto.email,
      firstname: createUserDto.firstname,
      lastname: createUserDto.lastname,
      password: hashPassword,
      role: createUserDto.role,
    });
  }

  deleteUser = (userToDelete: UserDocument) =>
    this.model.findByIdAndUpdate(userToDelete._id, { deletedAt: new Date() }).exec();

  
  editUser = (userToEdit: UserDocument, body: EditDto) =>
    this.model.findByIdAndUpdate(
      userToEdit._id, 
      {
        email: body.email,
        password: this.encryptionService.encrypt(body.password),
        firstname: body.firstname,
        lastname: body.lastname,
        updatedAt: new Date()
      }
    ).exec()
    
}
