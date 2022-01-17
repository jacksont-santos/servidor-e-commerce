import { Controller, Post, Body, Patch, Param, Get, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';
import { produtos } from '@prisma/client';
import { CreateItemDto } from './dto/createItem.dto';
import { UpdateItemDto } from './dto/updateItem.dto';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('product')
@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {};

  @Get('listitem')
  @ApiOperation({ summary: 'Obter lista de itens' })
  getlist(): Promise<any[]> {
    return this.service.getAllItens();
  }

  @Get('product/:id')
  @ApiOperation({ summary: 'Obter um item' })
  getItemById(@Param('id') id: string): Promise<produtos> {
    return this.service.getItem(id);
  }

  @UseGuards(AuthGuard())
  @Post('create')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar item' })
  createItem(@Body() dados: CreateItemDto): Promise<produtos> {
    return this.service.createItem(dados);
  }

  @UseGuards(AuthGuard())
  @Patch('updateitem/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar item' })
  updateItem( @Param('id') id: string, @Body() data: UpdateItemDto): Promise<produtos> {
    return this.service.updateItem(id, data);
  }

  @UseGuards(AuthGuard())
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Deletar item' })
  @ApiBearerAuth()
  deleteById(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.deleteItem(id);
  }
}
