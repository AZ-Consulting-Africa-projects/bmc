-- CreateEnum
CREATE TYPE "LeaverequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Leaverequest" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "leave_type" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "LeaverequestStatus" NOT NULL,
    "request_date" TEXT NOT NULL,
    "approval_date" TEXT,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "isActived" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Leaverequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Leaverequest" ADD CONSTRAINT "Leaverequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
