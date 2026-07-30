/*
  Warnings:

  - You are about to drop the column `artistId` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the `_ArtistToMovie` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title]` on the table `movies` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_ArtistToMovie" DROP CONSTRAINT "_ArtistToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToMovie" DROP CONSTRAINT "_ArtistToMovie_B_fkey";

-- AlterTable
ALTER TABLE "movies" DROP COLUMN "artistId";

-- DropTable
DROP TABLE "_ArtistToMovie";

-- CreateIndex
CREATE UNIQUE INDEX "movies_title_key" ON "movies"("title");

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
