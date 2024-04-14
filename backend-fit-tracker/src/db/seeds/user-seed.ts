import dataSource from '../data-source';

export async function seedUsers() {
  const user = dataSource.getRepository('users').create({
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'hash123',
  });

  await dataSource.getRepository('users').save(user);
  
  console.log('Users seeded successfully');
}
