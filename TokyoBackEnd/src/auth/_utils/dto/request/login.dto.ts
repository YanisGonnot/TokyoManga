import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";
import strongPasswordDecorator from "src/_utils/decorators/strong-password.decorator";

export class LoginDto{
    @ApiProperty({ example: 'atiteux@dev-id.fr' })
    @IsEmail()
    email: string;

    @ApiProperty({example: 'Test1234**'})
    @strongPasswordDecorator()
    password: string;
}
