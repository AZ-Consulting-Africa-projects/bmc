-- AlterTable
ALTER TABLE "User" ALTER COLUMN "imageUrl" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Departement" (
    "id" SERIAL NOT NULL,
    "departementName" TEXT NOT NULL,
    "description" TEXT,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "isActived" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Departement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poste" (
    "id" SERIAL NOT NULL,
    "posteName" TEXT NOT NULL,
    "description" TEXT,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "isActived" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deparetementId" INTEGER NOT NULL,

    CONSTRAINT "Poste_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Poste" ADD CONSTRAINT "Poste_deparetementId_fkey" FOREIGN KEY ("deparetementId") REFERENCES "Departement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
