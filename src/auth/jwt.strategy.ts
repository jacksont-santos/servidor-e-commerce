import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './jwt.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private database: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  };

  async validate(payload: { email: string }) {
    const usuario = await this.database.usuarios.findUnique({
      where: { email: payload.email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuário não encontrado');
    };

    delete usuario.senha;
    return usuario;
  };
}