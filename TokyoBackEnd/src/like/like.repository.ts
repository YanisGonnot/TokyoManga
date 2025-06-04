import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { Like, LikeDocument } from './like.schema';
import { PostLikeDto } from './_utils/dto/request/post-like.dto';
import { EncryptionService } from 'src/encryption/encryption.service';
import { LikeValueEnum } from './_utils/like-value-enum';
import { FilterGetLikes } from './_utils/dto/filter-get-likes';


@Injectable()
export class LikeRepository {
  private readonly orFailNotFound = new NotFoundException('Like not found');
  public readonly likeAlreadyExist = new BadRequestException('User already likes this manga');
  public readonly userAlreadyNotLike = new BadRequestException('User already doesn\'t like this manga');

  constructor(
    @InjectModel(Like.name) private model: Model<LikeDocument>,
  ) { }


  findOneById = (id: string) => this.model.findById(id).exec();

  findOneByIdOrThrow = (id: string) => this.model.findById(id).orFail(this.orFailNotFound).exec();


  findByTokenAndMangaOrThrow = (token: string, mangaId: string) =>
    this.model
      .findOne({ 
        recovery_token: token, 
        manga_id: mangaId 
      })
      .orFail(this.orFailNotFound)
      .exec();


  findAll = () => this.model.find({
    is_liked: LikeValueEnum.LIKE
  }).exec();


  findAllWithMangaArray = (mangaIDArray : string[]) => this.model.find({
    manga_id: { $in: mangaIDArray },
    is_liked: LikeValueEnum.LIKE
  }).exec();


  createLike = (token: string, postLike: PostLikeDto) => {
    return this.model.create({
      recovery_token: token,
      manga_id: postLike.mangaId,
      is_liked: LikeValueEnum.LIKE
    })
  }


  addLike = (token: string, mangaId: string) => 
    this.model.create({
      recovery_token: token,
      manga_id: mangaId,
      is_liked: LikeValueEnum.LIKE
    });


  updateLike = (like: LikeDocument) => 
    this.model.findByIdAndUpdate(like._id, {
      is_liked: LikeValueEnum.LIKE
    }).exec()
  

  removeLikeToNotLike = (like: LikeDocument) =>
    this.model.findByIdAndUpdate(like._id, { is_liked: LikeValueEnum.NOT_LIKE }).exec();


  deleteLike = (like: LikeDocument) => 
    this.model.deleteOne(like._id).exec();

}
