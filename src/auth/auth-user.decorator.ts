import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { usuarios } from '@prisma/client';

const AuthUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user as usuarios;
  delete user.senha;
  return user;
});

export default AuthUser;