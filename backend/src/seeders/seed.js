const { sequelize, EventInfo, Artist, Booking } = require("../models");
const { generateConfirmationCode } = require("../utils/generateCode");

const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Sync database (force: true will drop existing tables)
    await sequelize.sync({ force: true });
    console.log("✅ Database synced");

    // Create Event Info
    const event = await EventInfo.create({
      title: "La Grande Soirée Gnawa",
      description:
        "Une soirée magique célébrant la richesse du patrimoine musical Gnawa. Venez découvrir les plus grands maîtres de la musique Gnawa dans une ambiance authentique et festive.",
      event_date: new Date("2025-12-20T20:00:00"),
      location: "Agadir, Maroc",
      venue: "Théâtre de Verdure",
      total_capacity: 500,
      available_tickets: 500,
      ticket_price: 150.0,
      banner_image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    });
    console.log("✅ Event info created");

    // Create Artists
    const artists = await Artist.bulkCreate([
      {
        name: "Maâlem Hamid El Kasri",
        bio: "L une des figures les plus emblématiques de la musique Gnawa, reconnu pour sa voix puissante et son style unique fusionnant tradition et modernité.",
        genre: "Gnawa Fusion & Traditionnel",
        photo_url:
          "https://upload.wikimedia.org/wikipedia/commons/7/7b/Hamid_El_Kasri.jpg",
        performance_time: "21:00 - 22:00",
        performance_order: 2,
        is_headliner: true,
      },

      {
        name: "Maâlem Hassan Boussou",
        bio: "Maître de la musique Gnawa, Hassan Boussou perpétue la tradition avec passion depuis plus de 30 ans.",
        genre: "Gnawa Traditionnel",
        photo_url:
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400",
        performance_time: "20:00 - 21:00",
        performance_order: 1,
        is_headliner: true,
      },
      {
        name: "Fatima Zahra & Les Dames de Gnawa",
        bio: "Groupe féminin qui modernise la musique Gnawa avec des influences contemporaines.",
        genre: "Gnawa Fusion",
        photo_url:
          "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400",
        performance_time: "21:15 - 22:00",
        performance_order: 2,
        is_headliner: false,
      },
      {
        name: "Gnawa Njoum Experience",
        bio: "Collectif de jeunes musiciens qui réinventent le Gnawa avec des sonorités modernes.",
        genre: "Gnawa Moderne",
        photo_url:
          "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400",
        performance_time: "22:15 - 23:00",
        performance_order: 3,
        is_headliner: false,
      },
      {
        name: "Maâlem Abdeslam Alikane",
        bio: "Figure emblématique du Gnawa, connu pour ses performances spirituelles intenses.",
        genre: "Gnawa Spirituel",
        photo_url:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
        performance_time: "23:15 - 00:00",
        performance_order: 4,
        is_headliner: true,
      },
    ]);
    console.log("✅ Artists created");

    // Create sample bookings
    const bookings = await Booking.bulkCreate([
      {
        confirmation_code: generateConfirmationCode(),
        customer_name: "Ahmed El Mansouri",
        customer_email: "ahmed@example.com",
        customer_phone: "+212600000001",
        number_of_tickets: 2,
        total_amount: 300.0,
        status: "confirmed",
        booking_date: new Date(),
      },
      {
        confirmation_code: generateConfirmationCode(),
        customer_name: "Fatima Benali",
        customer_email: "fatima@example.com",
        customer_phone: "+212600000002",
        number_of_tickets: 4,
        total_amount: 600.0,
        status: "confirmed",
        booking_date: new Date(),
      },
    ]);
    console.log("✅ Sample bookings created");

    // Update available tickets
    await event.update({
      available_tickets: event.available_tickets - 6,
    });

    console.log("🎉 Database seeded successfully!");
    console.log(
      `📊 Created: 1 event, ${artists.length} artists, ${bookings.length} bookings`
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();
