/*
  Warnings:

  - You are about to drop the column `costToRun` on the `Cars` table. All the data in the column will be lost.
  - You are about to drop the column `maker` on the `Cars` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Cars` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Cars` table. All the data in the column will be lost.
  - Added the required column `automatic` to the `Cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand` to the `Cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carName` to the `Cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gps` to the `Cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgUrl` to the `Cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seatType` to the `Cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speed` to the `Cars` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cars" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brand" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "carName" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 1,
    "speed" TEXT NOT NULL,
    "gps" TEXT NOT NULL,
    "seatType" TEXT NOT NULL,
    "automatic" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Cars" ("description", "id", "model", "price") SELECT "description", "id", "model", "price" FROM "Cars";
DROP TABLE "Cars";
ALTER TABLE "new_Cars" RENAME TO "Cars";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
