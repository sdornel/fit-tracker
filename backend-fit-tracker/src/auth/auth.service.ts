import { Injectable } from "@nestjs/common";
import { Users } from "src/entities/user.entity";
import { UserService } from "src/user/user.service";
import { DataSource } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource
) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log('email', email);
    console.log('pass', pass);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const user = await queryRunner.query('SELECT * FROM "users" WHERE "email" = $1', [email]);
      if (user[0] && user[0].password === pass) {
          const { password, ...result } = user[0];
          return result;
      }
    } catch (error) {
        console.error('Error accessing the database:', error);
    } finally {
        await queryRunner.release();
    }
    return null;
  }
}
