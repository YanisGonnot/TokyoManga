import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class PostLikeDto {
  @ApiProperty({example: "1"})
  @IsString()
  mangaId: string;

}