/*
  Warnings:

  - You are about to drop the column `detail` on the `Log` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Log" DROP COLUMN "detail",
ADD COLUMN     "description" TEXT;
