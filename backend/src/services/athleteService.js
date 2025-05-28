const prisma = require('../prisma/client');

exports.createAthlete = async (data) => {
  const dateString = new Date().toISOString();
  return await prisma.athlete.create({
    data: {
      name: data.name,
      coachUID: data.coachUID,
      age: data.age || null,
      sportUID: data.sportUID || null,
    },
  });
}

exports.getAthleteByCoachUID = async (coachUID) => {
  return await prisma.athlete.findMany({
    where: {
      coachUID: coachUID,
    },
    include: {
        performances: true,
    },
    orderBy: {
      name: 'asc', // Order by name, alphabetically
    },
  });
}

exports.getAthleteVideoByCoachUID = async (coachUID) => {
  return await prisma.athletePerformance.findMany({
    where: {
      athlete: {
        coachUID: coachUID,
      },
    },
    include: {
      athlete: true, // Include athlete details
      video: true, // Include video details
    },
    orderBy: {
      date: 'desc', // Order by date, most recent first
    },
  });
}