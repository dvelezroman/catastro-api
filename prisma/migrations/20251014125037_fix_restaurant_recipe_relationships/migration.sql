/*
  Warnings:

  - You are about to drop the column `restaurantId` on the `recipes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."recipes" DROP CONSTRAINT "recipes_restaurantId_fkey";

-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "restaurantId";

-- CreateTable
CREATE TABLE "restaurant_recipes" (
    "id" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "restaurant_recipes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_recipes_restaurantId_recipeId_key" ON "restaurant_recipes"("restaurantId", "recipeId");

-- AddForeignKey
ALTER TABLE "restaurant_recipes" ADD CONSTRAINT "restaurant_recipes_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_recipes" ADD CONSTRAINT "restaurant_recipes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
