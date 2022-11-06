/*
  Warnings:

  - Added the required column `customerId` to the `ShoppingCart` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShoppingCart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "customerId" TEXT NOT NULL
);
INSERT INTO "new_ShoppingCart" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "ShoppingCart";
DROP TABLE "ShoppingCart";
ALTER TABLE "new_ShoppingCart" RENAME TO "ShoppingCart";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
