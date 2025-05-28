const prisma = require('../prisma/client');

exports.getAllSports = async () => {
  return await prisma.sport.findMany({
    orderBy: {
      name: 'asc', // Order by name, alphabetically
    },
  });
}