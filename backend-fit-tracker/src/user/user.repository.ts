import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    findAllUsers(): Promise<User[]> {
        return this.find();
    }
    
    findUserById(id: number): Promise<User> {
        return this.findOneBy({ id });
    }
    
    createUser(user: User): Promise<User> {
        return this.save(user);
    }
    
    async updateExercise(id: number, userData: Partial<User>): Promise<User> {
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
