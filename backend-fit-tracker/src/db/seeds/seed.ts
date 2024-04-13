import dataSource from '../data-source';
import { seedExercises } from './exercise-seed';
import { seedUserExercises } from './user-exercise-seed';
import { seedUsers } from './user-seed';

async function main() {
  try {
    // Initialize the data source connection
    await dataSource.initialize();
    console.log('Data Source has been initialized!');

    // Run the seed functions
    await seedUsers();
    console.log('Users have been seeded!');

    await seedExercises();
    console.log('Exercises have been seeded!');

    await seedUserExercises();
    console.log('UserExercises have been seeded!');

    // Close the data source connection
    await dataSource.destroy();
    console.log('Data Source has been closed!');
  } catch (error) {
    console.error('Error during Data Seeding:', error);
  }
}

main();