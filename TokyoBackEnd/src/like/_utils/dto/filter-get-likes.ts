import { LikeValueEnum } from "../like-value-enum";

export class FilterGetLikes {

    pageNumber : {$lte: number};
    countMangaOnPage = 25; 
    isLiked = LikeValueEnum.LIKE;
}