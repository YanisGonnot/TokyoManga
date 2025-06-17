import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';
import { IsObject, IsNumber, IsString, ValidateNested } from "class-validator";
import { Reactions } from "../reactions-comment-dto";

export class PostCommentDto{

    @ApiProperty({example: "1"})
    @IsString()
    mangaId: string;


    @ApiProperty({example: "Extraordinaire"})
    @IsString()
    title: string;

    @ApiProperty({example: "J'adore ce manga"})
    @IsString()
    message: string;

    @ApiProperty({example: 5})
    @IsNumber()
    score: number | undefined;

    @ApiProperty({ type: () => Reactions }) // Swagger lira le type correctement
    @ValidateNested()               // Valide les propriétés internes
    @Type(() => Reactions)                // Transforme automatiquement le JSON en classe
    @IsObject()                         // S'assure que c’est bien un objet
    reactions: Reactions
}