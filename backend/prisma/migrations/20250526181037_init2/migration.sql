-- CreateTable
CREATE TABLE "Sport" (
    "UID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Sport_pkey" PRIMARY KEY ("UID")
);

-- CreateTable
CREATE TABLE "Athlete" (
    "UID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER,
    "sportUID" INTEGER,

    CONSTRAINT "Athlete_pkey" PRIMARY KEY ("UID")
);

-- CreateTable
CREATE TABLE "Coach" (
    "UID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Coach_pkey" PRIMARY KEY ("UID")
);

-- CreateTable
CREATE TABLE "Video" (
    "UID" SERIAL NOT NULL,
    "size" INTEGER,
    "upload_date" TEXT,
    "url" TEXT NOT NULL,
    "status" TEXT DEFAULT 'Processing',
    "coachUID" INTEGER,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("UID")
);

-- CreateTable
CREATE TABLE "Metric" (
    "UID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("UID")
);

-- CreateTable
CREATE TABLE "AthletePerformance" (
    "AthleteUID" INTEGER NOT NULL,
    "VideoUID" INTEGER NOT NULL,
    "timestamp" TEXT NOT NULL,
    "metricUID" INTEGER NOT NULL,
    "metric_value" TEXT,

    CONSTRAINT "AthletePerformance_pkey" PRIMARY KEY ("AthleteUID","VideoUID","metricUID","timestamp")
);

-- AddForeignKey
ALTER TABLE "Athlete" ADD CONSTRAINT "Athlete_sportUID_fkey" FOREIGN KEY ("sportUID") REFERENCES "Sport"("UID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_coachUID_fkey" FOREIGN KEY ("coachUID") REFERENCES "Coach"("UID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AthletePerformance" ADD CONSTRAINT "AthletePerformance_AthleteUID_fkey" FOREIGN KEY ("AthleteUID") REFERENCES "Athlete"("UID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AthletePerformance" ADD CONSTRAINT "AthletePerformance_VideoUID_fkey" FOREIGN KEY ("VideoUID") REFERENCES "Video"("UID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AthletePerformance" ADD CONSTRAINT "AthletePerformance_metricUID_fkey" FOREIGN KEY ("metricUID") REFERENCES "Metric"("UID") ON DELETE RESTRICT ON UPDATE CASCADE;
