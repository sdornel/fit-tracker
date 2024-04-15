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

  // async validateUser(email: string, pass: string): Promise<any> {
  //   console.log('email', email);
  //   console.log('pass', pass);
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.connect();
  //   try {
  //     const user = await queryRunner.query('SELECT * FROM "users" WHERE "email" = $1', [email]);
  //     if (user[0] && user[0].password === pass) {
  //         const { password, ...result } = user[0];
  //         return result;
  //     }
  //   } catch (error) {
  //       console.error('Error accessing the database:', error);
  //   } finally {
  //       await queryRunner.release();
  //   }
  //   return null;
  // }

  async validateUser(email: string, pass: string): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    const user = await queryRunner.query('SELECT * FROM "users" WHERE "email" = $1', [email]);
    if (user[0] && user[0].password === pass) {
      const { password, ...result } = user[0];
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload: JwtPayload = { username: user.username, sub: user.userId };
    // console.log('this.jwtService.sign(payload)',this.jwtService.sign(payload));
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
