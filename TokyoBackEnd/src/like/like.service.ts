import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { LikeMapper } from './like.mapper';
import { LikeRepository } from './like.repository';
import { LikeDocument } from './like.schema';
import { UserDocument } from 'src/users/users.schema';
import { UsersRepository } from 'src/users/users.repository';
import { UsersMapper } from 'src/users/users.mapper';
import { PostLikeDto } from './_utils/dto/request/post-like.dto';
import { LikeValueEnum } from './_utils/like-value-enum';
import { FilterGetLikes } from './_utils/dto/filter-get-likes';
import { GetCountLikesDto } from './_utils/dto/response/get-count-likes.dto';
import { AddLikeDto } from './_utils/dto/request/add-like-dto';




@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly likeMapper: LikeMapper,
  ) { }

  // servira après
  getLike(like: LikeDocument) {
    return this.likeMapper.toGetLikeDto(like)
  }


  getLikeFromId(likeId: string) {
    return this.likeRepository
      .findOneByIdOrThrow(likeId)
      .then((like) => this.likeMapper.toGetLikeDto(like));
  }



  getLikes = async (token: string, mangaIdArray: string[]) => {
    const countLikesManga = mangaIdArray.map((id) => ({
      mangaId: id,
      countLikes: 0,
      isLikedByUser: false
    })
    );

    const likesAndMangaId = await this.likeRepository
      .findAllWithMangaArray(mangaIdArray)
      .then((likes) => this.likeMapper.toGetLikesAndMangaDto(likes));


    for (const like of likesAndMangaId.likes) {
      const index = mangaIdArray.indexOf(like.manga_id);
      countLikesManga[index].countLikes++;
      if (like.recovery_token === token) {
        countLikesManga[index].isLikedByUser = true
      }
    }
    return countLikesManga;
  }


  postLike = async (token: string, postLike: PostLikeDto) => {
    try {
      const like = await this.likeRepository
        .findByTokenAndMangaOrThrow(token, postLike.mangaId)

      if (like.is_liked === LikeValueEnum.NOT_LIKE) {
        return this.likeRepository
          .updateLike(like)
          .then((updatedLike) => this.likeMapper.toGetLikeDto(updatedLike!));
      }
      else {
        return this.likeRepository.likeAlreadyExist.message;
      }
    }
    catch (error: any) {
      return this.likeRepository
        .createLike(token, postLike)
        .then((newLike) => this.likeMapper.toGetLikeDto(newLike));
    }
  }



  removeLike = async (token: string, postNotLike: PostLikeDto) => {
    try {
      const like = await this.likeRepository
        .findByTokenAndMangaOrThrow(token, postNotLike.mangaId);

      if (like.is_liked === LikeValueEnum.LIKE) {
        return this.likeRepository
          .removeLikeToNotLike(like)
          .then((updatedLike) => this.likeMapper.toGetLikeDto(updatedLike!));
        //Autre option, supprimer directement le like
      }
      else {
        return this.likeRepository.userAlreadyNotLike.message;
      }
    }
    catch (error: any) {
      return error.message;
    }
  }



  //Version Giac revisitée
  addLike = async (user: UserDocument, mangaId: number) => {
    try {
      const like = await this.likeRepository
        .findByTokenAndMangaOrThrow(user.recoveryToken!, mangaId.toString())

      if (like.is_liked === LikeValueEnum.NOT_LIKE) {
        return this.likeRepository
          .updateLike(like)
          .then((updatedLike) => this.likeMapper.toGetLikeDto(updatedLike!));
      }
      else {
        return this.likeRepository.likeAlreadyExist.message;
      }
    }
    catch (error: any) {
      return this.likeRepository
        .addLike(user.recoveryToken!, mangaId.toString())
        .then((newLike) => this.likeMapper.toGetLikeDto(newLike));
    }
  }


  //différente signature
  removeLikeGiac = async (user: UserDocument, mangaId: number) => {
    try {
      const like = await this.likeRepository.findByTokenAndMangaOrThrow(user.recoveryToken!, mangaId.toString())
      if (like.is_liked === LikeValueEnum.LIKE) {
        return this.likeRepository
          .removeLikeToNotLike(like)
          .then((updatedLike) => this.likeMapper.toGetLikeDto(updatedLike!));
        //Autre option, supprimer directement le like
      }
      else {
        return this.likeRepository.userAlreadyNotLike.message;
      }
    }
    catch (error: any) {
      return error.message;
    }
  }


  deleteLikeGiac = async (user: UserDocument, mangaId: number) => {
    try {
      const like = await this.likeRepository.findByTokenAndMangaOrThrow(user.recoveryToken!, mangaId.toString())
      if (like.is_liked === LikeValueEnum.LIKE) {
        return this.likeRepository.deleteLike(like);
      }
      else {
        return this.likeRepository.userAlreadyNotLike.message;
      }
    }
    catch (error: any) {
      return error.message;
    }
  }
}
