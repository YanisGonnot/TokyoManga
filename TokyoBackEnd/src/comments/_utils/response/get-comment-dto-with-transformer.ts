import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";


export class GetCommentDtoWithClassTranformer {
    @Expose({name: '_id'})
    @ApiProperty()
    id: string;

    @Expose()
    @ApiProperty()
    userFirstname: string;

    @Expose()
    @ApiProperty()
    userLastname: string;

    @Expose({name: 'manga_id'})
    @ApiProperty()
    mangaId: string;

    @Expose({name: 'title'})
    @ApiProperty()
    title: string;

    @Expose({name: 'message'})
    @ApiProperty()
    message: string;

    @Expose()
    @Transform(({ value }) => value.toLocaleDateString('fr-FR'))
    @ApiProperty({ type: String, format: 'date-time' })
    createdAt: string;

    @Expose()
    @Transform(({ value }) => value.toLocaleDateString('fr-FR'))
    @ApiProperty({ type: String, format: 'date-time' })
    updatedAt: string;
}