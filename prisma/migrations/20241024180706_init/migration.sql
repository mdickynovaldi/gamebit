-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" MONEY NOT NULL,
    "description" VARCHAR(1000),
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "imageUrl" VARCHAR(255),
    "platforms" TEXT[],
    "genres" TEXT[],
    "rating" DOUBLE PRECISION NOT NULL,
    "developer" VARCHAR(100),
    "publisher" VARCHAR(100),
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_slug_key" ON "Game"("slug");
