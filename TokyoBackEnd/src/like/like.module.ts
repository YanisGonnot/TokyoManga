import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UniqueExistsConstraint } from 'src/_utils/decorators/unique-exists.decorator';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { UserExistsRule } from '../users/_utils/user-exist.rule';
import { LikeController } from './like.controller';
import { LikeMapper } from './like.mapper';
import { LikeRepository } from './like.repository';
import { Like, LikeSchema } from './like.schema';
import { LikeService } from './like.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
    forwardRef(() => JwtModule),
    EncryptionModule,
    UsersModule
  ],
  providers: [LikeService, LikeRepository, LikeMapper, UserExistsRule, UniqueExistsConstraint],
  controllers: [LikeController],
  exports: [LikeService, LikeRepository],
})
export class LikeModule {}
