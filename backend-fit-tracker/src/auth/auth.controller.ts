import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { Request, Response } from 'express';
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { access_token } = await this.authService.login(req.user);
    res.cookie('Authentication', access_token, { httpOnly: true, path: '/' });
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) { // try to type this better
    return req.user;
  }

  // this function doesn't do anything at the moment. i need to properly expire/remove the token in the future
  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response): any {
    return res.status(200).send({ message: 'Logged out successfully' });
  }
}
