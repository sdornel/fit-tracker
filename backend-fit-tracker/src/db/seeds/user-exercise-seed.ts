import dataSource from '../data-source';

export async function seedUserExercises() {
    const userRepository = dataSource.getRepository('users');
    const exerciseRepository = dataSource.getRepository('exercise');
    
    // Retrieve specific exercises
    const runningExercise = await exerciseRepository.findOneBy({ exerciseType: 'Running' });
    const pushUpsExercise = await exerciseRepository.findOneBy({ exerciseType: 'Push-ups' });

    // Retrieve the only user created
    const user = await userRepository.findOneBy({ email: 'john.doe@example.com' });
    if (user && runningExercise && pushUpsExercise) {
        user.exercises = [runningExercise, pushUpsExercise];
        // Save the updated user to automatically update the join table
        await userRepository.save(user);
        console.log('userexercises table has been seeded!');
    } else {
        console.log('Required users or exercises not found, cannot seed relationships.');
    }
}