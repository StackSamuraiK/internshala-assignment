import pool from "./pool";

import bcrypt from "bcryptjs";

async function seed() {
  const client = await pool.connect();
  try {
    console.log("Seeding database...");

    const hashedPassword = await bcrypt.hash("password123", 10);
    
    const agency1 = await client.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO UPDATE SET role = 'agency' RETURNING id",
      ["Elite Rentals", "agency@demo.com", hashedPassword, "agency"]
    );
    const agencyId1 = agency1.rows[0].id;

    const agency2 = await client.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO UPDATE SET role = 'agency' RETURNING id",
      ["Luxury Motors", "luxury@demo.com", hashedPassword, "agency"]
    );
    const agencyId2 = agency2.rows[0].id;

    await client.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO UPDATE SET role = 'customer' RETURNING id",
      ["Demo User", "user@demo.com", hashedPassword, "customer"]
    );

    const cars = [
      ["Toyota Innova Hycross", "MH 12 AB 1111", 7, 3500, agencyId1],
      ["Mahindra XUV700", "MH 12 AB 2222", 7, 3000, agencyId1],
      ["Hyundai Creta", "MH 12 AB 3333", 5, 2200, agencyId1],
      ["Mercedes-Benz S-Class", "MH 01 CC 9999", 5, 15000, agencyId2],
      ["BMW M4 Competition", "MH 01 BM 4444", 4, 18000, agencyId2],
      ["Audi Q8", "MH 01 AU 8888", 5, 12000, agencyId2],
      ["Tesla Model S", "MH 01 TS 1234", 5, 8000, agencyId2],
      ["Honda City", "DL 01 HH 5555", 5, 18000, agencyId1],
      ["Swift Dzire", "UP 16 AA 0001", 5, 1200, agencyId1],
      ["Fortuner Legender", "HR 26 FF 7777", 7, 5500, agencyId2],
    ];

    for (const car of cars) {
      await client.query(
        "INSERT INTO cars (vehicle_model, vehicle_number, seating_capacity, rent_per_day, agency_id) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING",
        car
      );
    }

    console.log("Database seeded successfully!");
    console.log("Demo Credentials:");
    console.log("- Agency: agency@demo.com / password123");
    console.log("- Agency: luxury@demo.com / password123");
    console.log("- Customer: user@demo.com / password123");

  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    client.release();
    process.exit(0);
  }
}

seed();
