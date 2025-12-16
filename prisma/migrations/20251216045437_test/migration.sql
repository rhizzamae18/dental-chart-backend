-- AlterTable
ALTER TABLE "Occlusion" ALTER COLUMN "molarClass" DROP NOT NULL,
ALTER COLUMN "molarClass" DROP DEFAULT,
ALTER COLUMN "molarClass" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "nationality" TEXT;
