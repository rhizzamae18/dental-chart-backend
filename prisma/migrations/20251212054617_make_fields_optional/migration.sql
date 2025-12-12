-- AlterTable
ALTER TABLE "DentalHistory" ALTER COLUMN "previousDentist" DROP NOT NULL,
ALTER COLUMN "lastDentalVisit" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MedicalHistory" ALTER COLUMN "physicianName" DROP NOT NULL,
ALTER COLUMN "physicianAddress" DROP NOT NULL,
ALTER COLUMN "physicianSpecialty" DROP NOT NULL,
ALTER COLUMN "physicianOfficeNumber" DROP NOT NULL;
