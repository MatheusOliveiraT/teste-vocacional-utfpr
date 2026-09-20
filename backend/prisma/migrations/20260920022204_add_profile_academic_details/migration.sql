-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "annualVacancies" INTEGER NOT NULL DEFAULT 80,
ADD COLUMN     "curriculumUrl" TEXT,
ADD COLUMN     "degreeType" TEXT NOT NULL DEFAULT 'Bacharelado',
ADD COLUMN     "durationYears" DOUBLE PRECISION NOT NULL DEFAULT 5,
ADD COLUMN     "semesters" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "shift" TEXT NOT NULL DEFAULT 'Integral';
