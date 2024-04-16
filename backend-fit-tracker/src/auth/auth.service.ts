import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Users } from "src/entities/user.entity";
import { JwtPayload } from "src/interfaces/jwt-payload.interface";
import { UserService } from "src/user/user.service";
import { DataSource } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService
  ) {}
  
  user: Users = null;

  async validateUser(email: string, pass: string): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    // const user = await queryRunner.query('SELECT * FROM "users" WHERE "email" = $1', [email]);
    this.user = (await queryRunner.query('SELECT * FROM "users" WHERE "email" = $1', [email]))[0];
    if (this.user && this.user.password === pass) {
      const { password, ...result } = this.user;
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

  validateToken(token: string) {
    return this.jwtService.verify(token, {
        secret : process.env.JWT_SECRET_KEY
    });
  }
}
