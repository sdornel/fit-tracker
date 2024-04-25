export async function seedGoals(queryRunner) {
  const entityManager = queryRunner.manager;
  const goals = [
    {
        title: 'run a marathon',
        type: 'long',
        notes: 'lorem ipsum...',
        deadline: '2024-12-31',
    }, {
        title: 'squat 500lbs',
        type: 'long',
        notes: 'lorem ipsum...',
        deadline: '2025-01-01',
    }, {
        title: 'live independently',
        type: 'long',
        notes: 'lorem ipsum...',
        deadline: '2025-02-20',
    }, {
        title: 'carry my grandchildren',
        type: 'long',
        notes: 'lorem ipsum...',
        deadline: '2025-03-15',
    },
    {
        title: 'do 5 sit to stands',
        type: 'short',
        notes: 'lorem ipsum...',
        deadline: '2024-06-30',
    },
    {
        title: 'do 10 squats',
        type: 'short',
        notes: 'lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...',
        deadline: '2024-07-21',
    },
    {
        title: 'do 10 pushups',
        type: 'short',
        notes: 'lorem ipsum...',
        deadline: '2024-08-05',
    },
    {
        title: 'walk 2 miles without pain',
        type: 'short',
        notes: 'lorem ipsum...',
        deadline: '2024-09-10',
    }
  ];

  const goalRepository = entityManager.getRepository('goal');

  for (const goal of goals) {
    const goalEntry = goalRepository.create(goal);
    await goalRepository.save(goalEntry);
  }
}
