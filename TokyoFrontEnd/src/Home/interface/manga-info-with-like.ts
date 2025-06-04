import { Manga } from "../../data/manga";
import { ResponseLikesDto } from "./response-likes-dto";

export interface MangaInfoWithLike {
    infoManga : Manga;
    likeManga: ResponseLikesDto;
}