import { Injectable } from '@nestjs/common';
import { Users } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<Users> {
    constructor(private dataSource: DataSource) {
        super(Users, dataSource.createEntityManager());
    }

    findAllUsers(): Promise<Users[]> {
        return this.find();
    }
    
    findUserById(id: number): Promise<Users> {
        return this.findOneBy({ id });
    }
    
    createUser(user: Users): Promise<Users> {
        return this.save(user);
    }
    
    async updateUser(id: number, userData: Partial<Users>): Promise<Users> {
        const user = await this.findOneBy({ id });
        if (!user) {
          throw new Error(`User not found with id ${id}`);
        }
        // merge existing fields with the ones to be updated
        this.merge(user, userData);
        return this.save(user);
    }
    
    async removeUser(id: number): Promise<void> {
        const result = await this.delete(id);
        if (result.affected === 0) {
          throw new Error(`User with ID "${id}" not found`);
        }
    }
}
