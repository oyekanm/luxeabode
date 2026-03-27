"use server";

import { CurrentUser } from "@/hooks";
import { prisma } from "@/lib";
import { deleteFirebaseFile } from "@/utils";
import { validateRoomOwnership } from "@/utils/validations";

export async function CreateBooking(
  booking: Booking,
): Promise<ActionResponse<Booking>> {
  const { userId, user_type } = await CurrentUser();
  const user: any = "ADMIN";
  const { endDate, roomId, startDate, totalCost } = booking;

  try {
    // Authentication check
    if (!userId) {
      return {
        success: false,
        error: " Unauthorized to reserve a room",
      };
    }

    const availability = await checkBookingAvailability(
      startDate,
      endDate,
      roomId,
    );

    if (!availability.available) {
      return { success: false, error: availability.error };
    }

    // create products
    const newBooking = await prisma.booking.create({
      data: {
        endDate,
        startDate,
        totalCost,
        roomId,
        userId,
        status: "PENDING",
        type: user_type === user ? "OFFLINE" : "ONLINE",
      },
    });
    return { success: true, data: newBooking as any };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: `error while creating a room.`,
    };
  }
}
export async function CreateTransaction(transaction: Transaction) {
  // const { userId, user_type } = await CurrentUser();
  // const user: any = "ADMIN";
  const {
    amount,
    card_type,
    paymentMethod,
    reference,
    bookingId,
    customerEmail,
  } = transaction;

  try {
    // Authentication check
    // if (!userId) {
    //   return {
    //     success: false,
    //     error: " Unauthorized to reserve a room",
    //   };
    // }

    // create products
    const newTransaction = await prisma.transaction.create({
      data: {
        paymentMethod,
        amount,
        bookingId,
        card_type,
        customerEmail,
        reference,
        status: "SUCCESSFUL",
        type: "PAYMENT",
      },
    });
    return { success: true, data: newTransaction };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: `error while creating a room.`,
    };
  }
}

export async function checkBookingAvailability(
  checkIn: Date,
  checkOut: Date,
  roomId: string,
) {
  try {
    // Check for any overlapping bookings
    const overlappingBookings = await prisma.booking.findMany({
      where: {
        roomId,
        AND: [
          {
            OR: [
              {
                // Check if new check-in date falls within existing booking
                AND: {
                  startDate: { lte: checkIn },
                  endDate: { gt: checkIn },
                },
              },
              {
                // Check if new check-out date falls within existing booking
                AND: {
                  startDate: { lt: checkOut },
                  endDate: { gte: checkOut },
                },
              },
              {
                // Check if new booking completely encompasses existing booking
                AND: {
                  startDate: { gte: checkIn },
                  endDate: { lte: checkOut },
                },
              },
            ],
          },
        ],
      },
    });

    if (overlappingBookings.length > 0) {
      return {
        available: false,
        error: "Selected dates overlap with existing reservations",
      };
    }

    return { available: true };
  } catch (error) {
    return {
      available: false,
      error: "Error checking availability",
    };
  }
}

// Function to get disabled dates for calendar
export async function getDisabledDates(roomId: string) {
  const bookings = await prisma.booking.findMany({
    where: { roomId },
    select: { startDate: true, endDate: true },
  });

  return bookings.map((booking) => ({
    start: booking.startDate,
    end: booking.endDate,
  }));
}
// export async function CreateReFund(
//   refund: Transaction
// ): Promise<ActionResponse<Booking>> {
//   const { userId, user_type } = await CurrentUser();
//   const user: any = "ADMIN";
//   const { amount,paymentMethod,status,type,bookingId } = refund;

//   try {
//     // Authentication check
//     if (!userId) {
//       return {
//         success: false,
//         error: " Unauthorized to reserve a room",
//       };
//     }

//     // create products
//     const newBooking = await prisma.booking.create({
//       data: {
//         endDate,
//         startDate,
//         totalCost,
//         roomId,
//         userId,
//         status: "RESERVED",
//         type: user_type === user ? "OFFLINE" : "ONLINE",
//       },
//     });
//     return { success: true, data: newBooking };
//   } catch (error) {
//     console.log(error);
//     return {
//       success: false,
//       error: `error while creating a room.`,
//     };
//   }
// }
