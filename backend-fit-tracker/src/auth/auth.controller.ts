import { Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    console.log('got here');
    const { access_token } = await this.authService.login(req.user);
    // console.log('access_token', access_token);
    res.cookie('Authentication', access_token, { httpOnly: true, path: '/' });
    return req.user;
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Request() req, @Response() res) {
  //   const token = await this.authService.login(req.user);
  //   res.cookie('Authentication', token.access_token, {
  //     httpOnly: true,
  //     path: '/',
  //     maxAge: 60 * 60 * 1000,  // 1 hour
  //   });
  //   // res.send({ message: 'Logged in successfully' });
  //   return req.user;
  // }
}