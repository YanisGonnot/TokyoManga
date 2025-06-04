import { Injectable } from '@nestjs/common';
import { LikeDocument } from './like.schema';
import { GetLikeStatusDto } from './_utils/dto/response/get-like.dto';
import { GetLikesAndMangaDto } from './_utils/dto/response/get-count-likes-manga.dto';

@Injectable()
export class LikeMapper {

  toGetLikeDto = (like: LikeDocument): GetLikeStatusDto => ({
    id: like._id.toString(),
    recovery_token: like.recovery_token,
    manga_id: like.manga_id,
    is_liked: like.is_liked
  });

  toGetLikesDto = (tab: LikeDocument[]) : GetLikeStatusDto[] => 
    tab.map((like) => this.toGetLikeDto(like));


  toGetLikesAndMangaDto = (tab: LikeDocument[]) : GetLikesAndMangaDto => {
    const likesAndManga : GetLikesAndMangaDto = {
      likes: tab.map((like) => this.toGetLikeDto(like)), 
      mangaIDArray:[]
    };

    for (const like of tab){
      if (!likesAndManga.mangaIDArray.includes(like.manga_id)){
        likesAndManga.mangaIDArray.push(like.manga_id);
      }
    }
    return likesAndManga;
  }
}