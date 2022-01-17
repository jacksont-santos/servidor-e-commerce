/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { usuarios } from '@prisma/client';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private database: PrismaService) { }

    async getAllUsers(): Promise<any[]> {
        const usersAll = await this.database.usuarios.findMany();
        const usersnoPass = usersAll.map(({ senha, ...resto }) => resto)
        return usersnoPass;
    };

    async getUser(id: string): Promise<usuarios> {
        const user = await this.database.usuarios.findUnique({ where: { id }, });
        if (!user) { throw new NotFoundException(' Usuário informado não foi encontrado'); };

        delete user.senha;
        return user;
    };

    async createUser(dataUserdto: CreateUserDto): Promise<usuarios> {
        const userExist = await this.database.usuarios.findUnique({
            where: { email: dataUserdto.email },
        });
        if (userExist) {
            throw new ConflictException(' Esse email já está cadastrado');
        };
        if (dataUserdto.senha !== dataUserdto.confirmacaoSenha) {
            throw new UnauthorizedException('Senha e confirmação de senha devem ser iguais');
        };
        const saltos = 10;
        const senhaHash = await bcrypt.hash(dataUserdto.senha, saltos);

        delete dataUserdto.confirmacaoSenha;
        const criarUsuario = await this.database.usuarios.create({
            data: {
                ...dataUserdto,
                senha: senhaHash,
            }
        });
        delete criarUsuario.senha;
        return criarUsuario;
    };

    async updateUser(id: string, dataUser: UpdateUserDto): Promise<usuarios> {
        const updateUsuario = await this.database.usuarios.update({
            data: dataUser,
            where: { id: id },
        });
        delete updateUsuario.senha;
        return updateUsuario;
    };

    async deleteUser(id: string): Promise<{ message: string }> {
        const user = await this.database.usuarios.findUnique({ where: { id }, });
        if (!user) { throw new NotFoundException(' Usuário informado não foi encontrado'); } else {
            await this.database.usuarios.delete({ where: { id }, });
            return { message: ' Usuário apagado' };
        };
    };

    async userList(usuarioId: string) {
        const itens = await this.database.usuarios.findUnique({
          where: { id: usuarioId },
          include: {
            produtos: true,
          },
        });
        return itens;
      }

    async addList(user: usuarios, produtoid: string) {
        const produto = await this.database.produtos.findUnique({
            where: { id: produtoid },
        });

        if (!produto) {
            throw new NotFoundException(' Item não encontrado');
        }

        const userLikedItem = await this.database.usuarios.findUnique({
            where: { id: user.id },
            include: {
              produtos: true,
            },
          });

          const listaProdutosUsuario = userLikedItem.produtos;
            let itemEncontrado = false;

            listaProdutosUsuario.map((item) => {
                if (item.id === produtoid){
                    itemEncontrado = true;
                };
            });

            if (itemEncontrado) {
                await this.database.usuarios.update({
                  where: { id: user.id },
                  data: {
                    produtos: {
                      disconnect: {
                        id: produto.id
                      },
                    },
                  },
                });
                return { message: 'Item removido da lista ' };
              } else {
                await this.database.usuarios.update({
                  where: { id: user.id },
                  data: {
                    produtos: {
                      connect: {
                        id: produto.id
                      },
                    },
                  },
                });
                return { message: 'Item adicionado na lista' };
              };
    };
}