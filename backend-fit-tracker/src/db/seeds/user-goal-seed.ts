export async function seedUserGoals(queryRunner) {
    const entityManager = queryRunner.manager;
    const userRepository = entityManager.getRepository('users');
    const goalRepository = entityManager.getRepository('goal');
    
    const allGoals = await goalRepository.find();

    // Retrieve the only user created
    const user = await userRepository.findOneBy({ email: 'john.doe@example.com' });
    if (user && allGoals.length > 0) {
        user.goals = allGoals;
        // Save the updated user to automatically update the join table
        await userRepository.save(user);
    } else {
        console.log('Required users or goals not found, cannot seed relationships.');
    }
}
