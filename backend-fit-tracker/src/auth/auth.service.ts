import { Injectable, Res } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Users } from "src/entities/user.entity";
import { JwtPayload } from "src/interfaces/jwt-payload.interface";
import { DataSource } from "typeorm";

@Injectable()
export class AuthService {
  user: Users = null;

  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const user = (await queryRunner.query('SELECT * FROM "users" WHERE "email" = $1', [email]))[0];

    queryRunner.release();
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload: JwtPayload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateToken(token: string) {
    const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET_KEY });
    return this.dataSource.getRepository(Users).findOneBy({ id: decoded.sub }); // returns a user
  }
}
