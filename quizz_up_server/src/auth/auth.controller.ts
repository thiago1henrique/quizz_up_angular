import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/AuthService';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.usersService.findByEmail(body.email);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isValid = await this.authService.comparePasswords(
      body.password,
      user.password,
    );

    if (!isValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return this.authService.login(user);
  }
}
