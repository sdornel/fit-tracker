import dataSource from '../data-source';
import { seedExercises } from './exercise-seed';
import { seedUserExercises } from './user-exercise-seed';
import { seedUsers } from './user-seed';

async function main() {
  await dataSource.initialize();

  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    console.log('Transaction started!');

    await seedUsers(queryRunner);
    console.log('Users have been seeded!');

    await seedExercises(queryRunner);
    console.log('Exercises have been seeded!');

    await seedUserExercises(queryRunner);
    console.log('UserExercises have been seeded!');

    await queryRunner.commitTransaction();
    console.log('Transaction has been committed!');    
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error('Error during Data Seeding, transaction rolled back:', error);
  } finally {
    await queryRunner.release();
    await dataSource.destroy();
    console.log('Data Source has been closed!');
  }
}

main();