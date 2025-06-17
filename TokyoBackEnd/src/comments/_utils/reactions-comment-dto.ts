import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class Reactions {
    @ApiProperty({example: 10})
    @IsNumber()
    overall: number = 0;

    @ApiProperty({example: 10})
    @IsNumber()
    nice: number = 0;

    @ApiProperty({example: 10})
    @IsNumber()
    love_it: number = 0;

    @ApiProperty({example: 8})
    @IsNumber()
    funny: number = 0;

    @ApiProperty({example: 2})
    @IsNumber()
    confusing: number = 0;

    @ApiProperty({example: 5})
    @IsNumber()
    informative: number = 0;

    @ApiProperty({example:7})
    @IsNumber()
    well_written: number = 0;

    @ApiProperty({example: 0})
    @IsNumber()
    creative: number = 0;
}

export const defaultReactions : Reactions = {
    "overall": 0,
    "nice": 0,
    "love_it": 0,
    "funny": 0,
    "confusing": 0,
    "informative": 0,
    "well_written": 0,
    "creative": 0
};