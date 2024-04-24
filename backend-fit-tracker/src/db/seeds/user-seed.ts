export async function seedUsers(queryRunner) {
  const entityManager = queryRunner.manager;
  const user = entityManager.getRepository('users').create({
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'hash123',
  });

  await entityManager.getRepository('users').save(user);
}
