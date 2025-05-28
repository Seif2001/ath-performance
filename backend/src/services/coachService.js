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

exports.tagPlayerToVideo = async (data) => {
    console.log("Tagging player to video:", data);
    
    const taggedVideo = await prisma.athletePerformance.create({
        data: {
            AthleteUID: data.athleteUID,
            VideoUID: data.videoUID,
            metricUID: data.metricUID,
            metric_value: data.metric_value || null, // Optional field
            timestamp: data.timestamp || new Date().toISOString(), // Use current time if not provided
        },
    });
    
    console.log("Player tagged to video:", taggedVideo);
    return taggedVideo;
}


exports.getAthleteTagsByVideoUID = async (videoUID) => {
    console.log("Fetching athlete performance by video UID:", videoUID);
    
    const performances = await prisma.athletePerformance.findMany({
        where: {
            VideoUID: videoUID,
        },
        include: {
            athlete: true, // Include athlete details
            video: true, // Include video details
            metric: true, // Include metric details
        },
        orderBy: {
            timestamp: 'asc', // Order by timestamp, ascending
        },
    });
    
    if (!performances || performances.length === 0) {
        console.log("No performances found for this video.");
        return []; // Return an empty array if no performances found
    }
    
    return performances;
}

exports.checkAthletePerformanceExists = async (athleteUID, videoUID) => {
    
  const performance = await prisma.athletePerformance.findFirst({
    where: {
      AthleteUID: athleteUID,
      VideoUID: videoUID,
    },
  });
  
    
    return performance !== null; // Returns true if exists, false otherwise
}
  
/* model AthletePerformance {
  AthleteUID   Int
  VideoUID     Int
  timestamp    String
  metricUID    Int
  metric_value String?

  athlete      Athlete   @relation(fields: [AthleteUID], references: [UID])
  video        Video     @relation(fields: [VideoUID], references: [UID])
  metric       Metric    @relation(fields: [metricUID], references: [UID])

  @@id([AthleteUID, VideoUID, metricUID, timestamp])
}*/