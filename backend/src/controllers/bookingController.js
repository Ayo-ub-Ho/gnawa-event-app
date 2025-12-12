const { Booking, EventInfo } = require("../models");
const { generateConfirmationCode } = require("../utils/generateCode");
const { Op } = require("sequelize");

exports.createBooking = async (req, res, next) => {
  try {
    const { customer_name, customer_email, customer_phone, number_of_tickets } =
      req.body;

    // Validation
    if (
      !customer_name ||
      !customer_email ||
      !customer_phone ||
      !number_of_tickets
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (number_of_tickets < 1 || number_of_tickets > 10) {
      return res.status(400).json({
        success: false,
        message: "Number of tickets must be between 1 and 10",
      });
    }

    // Get event info for price and availability
    const event = await EventInfo.findOne({
      order: [["created_at", "DESC"]],
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Check availability
    if (event.available_tickets < number_of_tickets) {
      return res.status(400).json({
        success: false,
        message: `Only ${event.available_tickets} tickets available`,
      });
    }

    // Calculate total amount
    const total_amount = parseFloat(event.ticket_price) * number_of_tickets;

    // Generate unique confirmation code
    let confirmation_code;
    let isUnique = false;
    while (!isUnique) {
      confirmation_code = generateConfirmationCode();
      const existing = await Booking.findOne({ where: { confirmation_code } });
      if (!existing) isUnique = true;
    }

    // Create booking
    const booking = await Booking.create({
      confirmation_code,
      customer_name,
      customer_email,
      customer_phone,
      number_of_tickets,
      total_amount,
      status: "confirmed",
      booking_date: new Date(),
    });

    // Update available tickets
    await event.update({
      available_tickets: event.available_tickets - number_of_tickets,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

exports.getBookingByCode = async (req, res, next) => {
  try {
    const { code } = req.params;

    const booking = await Booking.findOne({
      where: { confirmation_code: code.toUpperCase() },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

exports.getBookingsByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;

    const bookings = await Booking.findAll({
      where: {
        customer_email: {
          [Op.iLike]: email,
        },
      },
      order: [["booking_date", "DESC"]],
    });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};
