import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class GetLikesDto {
    @ApiProperty({example: ["1", "2", "4", "7", "10"]})
    @IsString({each: true})
    mangaIdArray: string[]
}