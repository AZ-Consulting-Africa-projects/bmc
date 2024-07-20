-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('REVENUE', 'EXPENSE', 'PROFIT');

-- CreateEnum
CREATE TYPE "SaleReportType" AS ENUM ('Performance', 'commerciale', 'Previsions');

-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('ACCEPT', 'REJECT');

-- CreateEnum
CREATE TYPE "QuoteType" AS ENUM ('DEVIS', 'FACTURE');

-- CreateEnum
CREATE TYPE "OportunityStatus" AS ENUM ('OPEN', 'CLOSE');

-- CreateEnum
CREATE TYPE "StageType" AS ENUM ('Prospection', 'Negociation');

-- CreateEnum
CREATE TYPE "CustomerStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PROSPECT');

-- CreateTable
CREATE TABLE "Financialreports" (
    "id" SERIAL NOT NULL,
    "report_type" "ReportType" NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "generated_at" TEXT NOT NULL,
    "total_revenue" DECIMAL(65,30) NOT NULL,
    "total_expenses" DECIMAL(65,30) NOT NULL,
    "net_profit" DECIMAL(65,30) NOT NULL,
    "assets" DECIMAL(65,30) NOT NULL,
    "liabilities" DECIMAL(65,30) NOT NULL,
    "equity" DECIMAL(65,30) NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "isActived" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Financialreports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" "CustomerStatus" NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "isActived" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Salesopportunities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "customerId" INTEGER NOT NULL,
    "stage" "StageType" NOT NULL,
    "estimated_amount" INTEGER NOT NULL,
    "close_date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "OportunityStatus" NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "isActived" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Salesopportunities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quotes" (
    "id" SERIAL NOT NULL,
    "type" "QuoteType" NOT NULL,
    "customerId" INTEGER NOT NULL,
    "date_issued" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "status" "QuoteStatus" NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "isActived" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Salesreports" (
    "id" SERIAL NOT NULL,
    "report_type" "SaleReportType" NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "total_revenue" DECIMAL(65,30) NOT NULL,
    "total_opportunities" INTEGER NOT NULL,
    "conversion_rate" DECIMAL(65,30) NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "isActived" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Salesreports_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Salesopportunities" ADD CONSTRAINT "Salesopportunities_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quotes" ADD CONSTRAINT "Quotes_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
