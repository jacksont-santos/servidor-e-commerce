/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsNotEmpty, Length, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto {

    @IsString()
    @IsNotEmpty()
    @Length(2, 20)
    @IsOptional()
    @ApiPropertyOptional()
    nome: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 25)
    @IsOptional()
    @ApiPropertyOptional()
    senha: string;
}