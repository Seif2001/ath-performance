const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  // Seed Sports
  await prisma.sport.createMany({
    data: [
      { name: 'Running' },
      { name: 'Swimming' },
      { name: 'Cycling' },
    ],
    skipDuplicates: true,
  });

  // Seed Metrics
  await prisma.metric.createMany({
    data: [
      { name: 'Speed' },
      { name: 'Heart Rate' },
      { name: 'Distance' },
    ],
    skipDuplicates: true,
  });

  console.log('Seeded Sports and Metrics');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
