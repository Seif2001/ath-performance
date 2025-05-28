const prisma = require('../prisma/client');

exports.createVideo = async (data) => {
    // date to string
    const dateString = new Date().toISOString();
  return await prisma.video.create({
    data: {
      url: data.url,
      coachUID: data.coachUID,
      upload_date: dateString,
      size: data.size || null,
    },
  });
}

exports.deleteVideo = async (UID) => {
  return await prisma.video.delete({
    where: {
      UID: UID,
    },
  });
}

exports.getVideoByCoachUID = async (coachUID) => {
  return await prisma.video.findMany({
    where: {
      coachUID: coachUID,
    },
    orderBy: {
      upload_date: 'desc', // Order by upload date, most recent first
    },
  });
}

exports.getVideoByUID = async (UID) => {
  return await prisma.video.findUnique({
    where: {
      UID: UID,
    },
  });
}

exports.updateStatus = async (UID) => {
  return await prisma.video.update({
    where: {
      UID: UID,
    },
    data: {
      status: 'Complete', // Assuming 'processed' is the status you want to set
    },
  });
}