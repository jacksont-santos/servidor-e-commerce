/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  @ApiProperty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nascimento: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 25)
  @ApiProperty()
  senha: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 25)
  @ApiProperty()
  confirmacaoSenha: string;
}
