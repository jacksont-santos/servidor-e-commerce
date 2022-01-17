/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { produtos } from '@prisma/client';
import { CreateItemDto } from './dto/createItem.dto';
import { UpdateItemDto } from './dto/updateItem.dto';

@Injectable()
export class ProductsService {
    constructor(private database: PrismaService) { };

    async getAllItens(): Promise<any[]> {
        const allProducts = await this.database.produtos.findMany();
        return allProducts;
    };

    async getItem(id: string): Promise<produtos> {
        const item = await this.database.produtos.findUnique({ where: { id: id }, });
        if (!item) { throw new NotFoundException(' Item não encontrado'); };
        return item;
    };

    async createItem(dadosdto: CreateItemDto): Promise<produtos> {
        const item = await this.database.produtos.findFirst({ where: { nome: dadosdto.nome }, });
        if (item) {
            throw new ConflictException(' Esse produto já foi cadastrado');
        };
        const criarItem = await this.database.produtos.create({ data: dadosdto });
        return criarItem;
    };

    async updateItem(id: string, dataItem: UpdateItemDto): Promise<produtos> {
        const updateItem = await this.database.produtos.update({
            data: dataItem,
            where: { id: id }
        });
        return updateItem;
    };

    async deleteItem(id: string): Promise<{ message: string }> {
        const item = await this.database.produtos.findUnique({ where: { id: id } });
        if (!item) { throw new NotFoundException(' Item informado não foi encontrado'); } else {
            await this.database.produtos.delete({ where: { id: id } });
            return { message: ' Item deletado' };
        };
    };
}
