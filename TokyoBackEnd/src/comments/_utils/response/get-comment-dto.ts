import { ApiProperty } from "@nestjs/swagger";
import { Date } from "mongoose";

export class GetCommentDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    userFirstname: string;

    @ApiProperty()
    userLastname: string;

    @ApiProperty()
    mangaId: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    message: string;

    @ApiProperty({ type: String, format: 'date-time' })
    createdAt: Date;

    @ApiProperty({ type: String, format: 'date-time' })
    updatedAt: Date;
}