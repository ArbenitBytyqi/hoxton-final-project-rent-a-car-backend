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
    "description" TEXT NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Cars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Cars" ("automatic", "brand", "carName", "description", "gps", "id", "imgUrl", "model", "price", "rating", "seatType", "speed", "userId") SELECT "automatic", "brand", "carName", "description", "gps", "id", "imgUrl", "model", "price", "rating", "seatType", "speed", "userId" FROM "Cars";
DROP TABLE "Cars";
ALTER TABLE "new_Cars" RENAME TO "Cars";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
