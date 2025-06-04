import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UniqueExistsConstraint } from 'src/_utils/decorators/unique-exists.decorator';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { UserExistsRule } from '../users/_utils/user-exist.rule';
import { CommentController } from './comment.controller';
import { CommentMapper } from './comment.mapper';
import { CommentRepository } from './comment.repository';
import { CommentSchema, Comment } from './comment.schema';
import { CommentService } from './comment.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    forwardRef(() => JwtModule),
    EncryptionModule,
    UsersModule
  ],
  providers: [CommentService, CommentRepository, CommentMapper, UserExistsRule, UniqueExistsConstraint],
  controllers: [CommentController],
  exports: [CommentService, CommentRepository],
})
export class CommentModule {}
