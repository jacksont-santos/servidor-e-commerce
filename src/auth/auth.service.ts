import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CredentialsDto, AuthResponse } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private database: PrismaService, private jwt: JwtService) { };

  async login(dadosLogin: CredentialsDto): Promise <AuthResponse> {
    const { email, senha } = dadosLogin;
    const usuario = await this.database.usuarios.findUnique({
      where: { email }
    });
    if (!usuario) {
      throw new NotFoundException('Usuário não foi encontrado');
    };
    const senhaValida = await bcrypt.compare(
      senha,
      usuario.senha
    );
    if (!senhaValida) {
      throw new UnauthorizedException('Credenciais inválidas');
    };
      delete usuario.senha;
      return {
        token: this.jwt.sign({email}),
         usuario };
  };
}