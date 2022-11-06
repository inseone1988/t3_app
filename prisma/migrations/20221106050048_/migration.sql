/*
  Warnings:

  - You are about to drop the column `customerId` on the `ShoppingCart` table. All the data in the column will be lost.
  - Added the required column `userId` to the `ShoppingCart` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShoppingCart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL
);
INSERT INTO "new_ShoppingCart" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "ShoppingCart";
DROP TABLE "ShoppingCart";
ALTER TABLE "new_ShoppingCart" RENAME TO "ShoppingCart";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
