const prisma = require('../prisma/client');

exports.createCoach = async (name) => {
  const createdCoach =  await prisma.coach.create({
    data: {
      name: name,
    },
  });
    console.log("Coach created:", createdCoach);
    return createdCoach;
};

exports.getCoachByName = async (name) => {
    console.log("Fetching coach by name:", name);
    
    const coach = await prisma.coach.findFirst({
      where: {
        name: name,
      },
    });
  
    if (!coach) {
      console.log("No coach found with that name.");
      return null; // Or throw an error, or handle as needed
    }
  
    return coach;
  };


exports.getCoachById = async (id) => {
    console.log("Fetching coach by ID:", id);
    
    const coach = await prisma.coach.findUnique({
        where: {
        UID: id,
        },
    });
    
    if (!coach) {
        console.log("No coach found with that ID.");
        return null; // Or throw an error, or handle as needed
    }
    
    return coach;
}
  
