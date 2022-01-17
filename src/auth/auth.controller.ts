import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { usuarios } from '@prisma/client';
import AuthUser from './auth-user.decorator';
import { CredentialsDto, AuthResponse } from './dto/credentials.dto';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {};

  @Post('login')
  @ApiOperation({
    summary: 'Fazer login com um usuário e gerar um token'
  })
  login(@Body() data: CredentialsDto): Promise <AuthResponse> {
    return this.authService.login(data);
  }

  @UseGuards(AuthGuard())
  @Get('profile')
  @ApiOperation({
    summary: 'Retornar o usuário logado'
  })
  @ApiBearerAuth()
  profile(@AuthUser() user: usuarios) {
    return user;
  }
}
