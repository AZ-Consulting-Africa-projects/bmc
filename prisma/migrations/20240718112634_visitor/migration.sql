-- CreateEnum
CREATE TYPE "VisitorStatus" AS ENUM ('GOING', 'WAITING', 'DONE');

-- CreateTable
CREATE TABLE "Visitor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "purpose_of_visit" TEXT NOT NULL,
    "arrival_date" TEXT NOT NULL,
    "arrival_time" TEXT NOT NULL,
    "departure_date" TEXT NOT NULL,
    "person_to_meet" TEXT NOT NULL,
    "status" "VisitorStatus" NOT NULL,
    "visitor_id_card" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "isActived" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);
