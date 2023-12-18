/*
  Warnings:

  - You are about to drop the column `booking_date` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "booking_date",
ADD COLUMN     "bookingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
