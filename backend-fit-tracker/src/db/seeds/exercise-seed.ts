import dataSource from '../data-source';

export async function seedExercises(queryRunner) {
  const entityManager = queryRunner.manager;
  const exercises = [
    {
      exerciseType: 'Running',
      distance: '5km',
      time: '18:30',
      repetitions: null,
      resistance: null,
    },
    {
      exerciseType: 'Push-ups',
      distance: null,
      repetitions: '30',
      resistance: null,
    },
  ];

  const exerciseRepository = entityManager.getRepository('exercise');

  for (const exercise of exercises) {
    const exerciseEntry = exerciseRepository.create(exercise);
    await exerciseRepository.save(exerciseEntry);
  }

  console.log('Exercises seeded successfully');
}
