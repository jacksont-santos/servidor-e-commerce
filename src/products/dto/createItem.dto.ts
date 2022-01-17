/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
    
    @IsString()
    @IsNotEmpty({ message: ' O nome não pode ficar vazio' })
    @ApiProperty()
    nome: string;

    @IsString()
    @IsNotEmpty({ message: ' Informe o preço' })
    @ApiProperty()
    preco: string;

    @IsString()
    @IsNotEmpty({ message: ' Informe a for de pagamento' })
    @ApiProperty()
    pagamento: string;

    @IsString()
    @IsNotEmpty({ message: ' Adicione uma imagem' })
    @ApiProperty()
    imagemUrl: string;

    @IsString()
    @IsNotEmpty({ message: ' Informe a marca do produto' })
    @IsOptional()
    @ApiProperty()
    marca: string;

    @IsString()
    @IsNotEmpty({ message: ' Descreva-o' })
    @IsOptional()
    @ApiProperty()
    descricao: string;
}
