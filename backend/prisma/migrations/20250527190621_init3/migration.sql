/*
  Warnings:

  - Added the required column `coachUID` to the `Athlete` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Athlete" ADD COLUMN     "coachUID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Athlete" ADD CONSTRAINT "Athlete_coachUID_fkey" FOREIGN KEY ("coachUID") REFERENCES "Coach"("UID") ON DELETE RESTRICT ON UPDATE CASCADE;
