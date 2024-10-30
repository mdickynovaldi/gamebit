/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Developer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Genre` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Platform` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Publisher` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Developer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Genre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Platform` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Publisher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Developer_name_key";

-- DropIndex
DROP INDEX "Genre_name_key";

-- DropIndex
DROP INDEX "Platform_name_key";

-- DropIndex
DROP INDEX "Publisher_name_key";

-- DropIndex
DROP INDEX "Tag_name_key";

-- AlterTable
ALTER TABLE "Developer" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Genre" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Platform" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Publisher" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Developer_slug_key" ON "Developer"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_slug_key" ON "Genre"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Platform_slug_key" ON "Platform"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Publisher_slug_key" ON "Publisher"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");
