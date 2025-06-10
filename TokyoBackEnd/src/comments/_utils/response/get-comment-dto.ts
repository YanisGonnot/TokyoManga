import { ApiProperty } from "@nestjs/swagger";

export class GetCommentDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    user_firstname: string;

    @ApiProperty()
    user_lastname: string;

    @ApiProperty()
    manga_id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    message: string;

}