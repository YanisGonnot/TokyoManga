import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

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
    
}