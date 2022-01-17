/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, Body, Patch, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { usuarios } from '@prisma/client';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import AuthUser from 'src/auth/auth-user.decorator';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('user')
@Controller('')
export class UserController {
  constructor(private service: UserService) {};

  @UseGuards(AuthGuard())
  @Get('listUsers')
  @ApiOperation({ summary: 'Obter lista de usuarios' })
  @ApiBearerAuth()
  getallUsers(): Promise<any[]> {
    return this.service.getAllUsers();
  }

  @UseGuards(AuthGuard())
  @Get('user/:id')
  @ApiOperation({ summary: 'Obter usuário' })
  @ApiBearerAuth()
  getUserById(@Param('id') id: string): Promise<usuarios> {
    return this.service.getUser(id);
  }

  @UseGuards(AuthGuard())
  @Get('userList')
  @ApiOperation({
    summary: 'Ver a lista de itens adicionados ao carrinho',
  })
  @ApiBearerAuth()
  userList(@AuthUser() user: usuarios) {
    return this.service.userList(user.id);
  }

  @Post('createUser')
  @ApiOperation({ summary: 'Criar usuário' })
  createUser(@Body() data: CreateUserDto): Promise<usuarios> {
    return this.service.createUser(data);
  }

  @UseGuards(AuthGuard())
  @Patch('update/:id')
  @ApiOperation({ summary: 'Atualizar usuário' })
  updateUser(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<usuarios> {
    return this.service.updateUser(id, data);
  }

  @UseGuards(AuthGuard())
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Deletar usuário' })
  deleteById(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.deleteUser(id);
  }

  @UseGuards(AuthGuard())
  @Patch('addList/:id')
  @ApiOperation({ summary: 'Adicionar item à lista do usuário' })
  @ApiBearerAuth()
  addList(@AuthUser() user: usuarios, @Param('id') produtoId: string) {
    return this.service.addList(user, produtoId);
  }
}