const prisma = require('../prisma/client');

exports.getAllMetrics = async () => {
  return await prisma.metric.findMany({
    orderBy: {
      name: 'asc', // Order by name, alphabetically
    },
  });
}