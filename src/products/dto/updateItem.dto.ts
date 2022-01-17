import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateItemDto {
    
    @IsString()
    @IsNotEmpty({ message: ' O nome não pode ficar vazio' })
    @IsOptional()
    nome: string;

    @IsString()
    @IsNotEmpty({ message: ' Informe o preço' })
    @IsOptional()
    preco: string;

    @IsString()
    @IsNotEmpty({ message: ' Informe a for de pagamento' })
    @IsOptional()
    pagamento: string;

    @IsString()
    @IsNotEmpty({ message: ' Adicione uma imagem' })
    @IsOptional()
    imagemUrl: string;

    @IsString()
    @IsNotEmpty({ message: ' Informe a marca do produto' })
    @IsOptional()
    marca: string;

    @IsString()
    @IsNotEmpty({ message: ' Descreva-o' })
    @IsOptional()
    descricao: string;
}