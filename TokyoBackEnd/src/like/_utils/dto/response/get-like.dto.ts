import { ApiProperty } from "@nestjs/swagger";
import { LikeValueEnum } from "../../like-value-enum";

export class GetLikeStatusDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    recovery_token: string;

    @ApiProperty()
    manga_id: string;

    @ApiProperty()
    is_liked: LikeValueEnum;
}