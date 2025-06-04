import { ApiProperty } from "@nestjs/swagger";
import { GetLikeStatusDto } from "./get-like.dto";

export class GetLikesAndMangaDto{
    @ApiProperty()
    likes: GetLikeStatusDto[];

    @ApiProperty()
    mangaIDArray : string[]
}