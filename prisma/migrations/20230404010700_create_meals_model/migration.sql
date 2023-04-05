-- CreateTable
CREATE TABLE "Meals" (
    "meal_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "date_time" DATETIME NOT NULL,
    "in_diet" BOOLEAN NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Meals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
