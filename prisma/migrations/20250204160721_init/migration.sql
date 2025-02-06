/*
  Warnings:

  - You are about to drop the column `description` on the `customExercises` table. All the data in the column will be lost.
  - Added the required column `userId` to the `weight` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_customExercises" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);
INSERT INTO "new_customExercises" ("id", "name", "userId") SELECT "id", "name", "userId" FROM "customExercises";
DROP TABLE "customExercises";
ALTER TABLE "new_customExercises" RENAME TO "customExercises";
CREATE UNIQUE INDEX "customExercises_userId_key" ON "customExercises"("userId");
CREATE TABLE "new_weight" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "weight" REAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL
);
INSERT INTO "new_weight" ("date", "id", "weight") SELECT "date", "id", "weight" FROM "weight";
DROP TABLE "weight";
ALTER TABLE "new_weight" RENAME TO "weight";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
