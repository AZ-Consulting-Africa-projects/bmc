/*
  Warnings:

  - The values [PENDING,ACCEPTED,REJECTED] on the enum `RecrutementStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `documents` on the `Recrutement` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Recrutement` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Recrutement` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Recrutement` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Recrutement` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Recrutement` table. All the data in the column will be lost.
  - You are about to drop the column `post` on the `Recrutement` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Recrutement` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `closing_date` to the `Recrutement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Recrutement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Recrutement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poste` to the `Recrutement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posting_date` to the `Recrutement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requirement` to the `Recrutement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsability` to the `Recrutement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary` to the `Recrutement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Recrutement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RecrutementStatus_new" AS ENUM ('OPEN', 'CLOSE');
ALTER TABLE "Recrutement" ALTER COLUMN "status" TYPE "RecrutementStatus_new" USING ("status"::text::"RecrutementStatus_new");
ALTER TYPE "RecrutementStatus" RENAME TO "RecrutementStatus_old";
ALTER TYPE "RecrutementStatus_new" RENAME TO "RecrutementStatus";
DROP TYPE "RecrutementStatus_old";
COMMIT;

-- DropIndex
DROP INDEX "Recrutement_email_key";

-- AlterTable
ALTER TABLE "Recrutement" DROP COLUMN "documents",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "phone",
DROP COLUMN "position",
DROP COLUMN "post",
ADD COLUMN     "closing_date" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "isActived" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isVisible" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "poste" TEXT NOT NULL,
ADD COLUMN     "posting_date" TEXT NOT NULL,
ADD COLUMN     "requirement" TEXT NOT NULL,
ADD COLUMN     "responsability" TEXT NOT NULL,
ADD COLUMN     "salary" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserRecrutement" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "recrutementId" INTEGER NOT NULL,
    "cv" TEXT NOT NULL,
    "lettre" TEXT,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "isActived" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRecrutement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recrutement_title_key" ON "Recrutement"("title");

-- AddForeignKey
ALTER TABLE "UserRecrutement" ADD CONSTRAINT "UserRecrutement_recrutementId_fkey" FOREIGN KEY ("recrutementId") REFERENCES "Recrutement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRecrutement" ADD CONSTRAINT "UserRecrutement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
