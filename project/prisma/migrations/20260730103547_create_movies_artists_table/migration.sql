-- CreateTable
CREATE TABLE "movies_artists" (
    "movieId" INTEGER NOT NULL,
    "artistId" INTEGER NOT NULL,
    "character" TEXT NOT NULL,

    CONSTRAINT "movies_artists_pkey" PRIMARY KEY ("movieId","artistId")
);

-- AddForeignKey
ALTER TABLE "movies_artists" ADD CONSTRAINT "movies_artists_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movies_artists" ADD CONSTRAINT "movies_artists_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
