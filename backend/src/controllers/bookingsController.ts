import { Response } from "express";
import pool from "../db/pool";
import { AuthRequest } from "../middleware/auth";

export async function createBooking(req: AuthRequest, res: Response) {
  const { car_id, start_date, num_days } = req.body;
  if (!car_id || !start_date || !num_days) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  const carResult = await pool.query("SELECT * FROM cars WHERE id = $1", [
    car_id,
  ]);
  if (carResult.rows.length === 0) {
    res.status(404).json({ message: "Car not found" });
    return;
  }

  const car = carResult.rows[0];
  const total_cost = parseFloat(car.rent_per_day) * parseInt(num_days);

  const result = await pool.query(
    "INSERT INTO bookings (car_id, customer_id, start_date, num_days, total_cost) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [car_id, req.user!.id, start_date, num_days, total_cost]
  );
  res.status(201).json(result.rows[0]);
}

export async function getAgencyBookings(req: AuthRequest, res: Response) {
  const result = await pool.query(
    `SELECT 
      b.id,
      b.start_date,
      b.num_days,
      b.total_cost,
      b.created_at,
      c.vehicle_model,
      c.vehicle_number,
      c.rent_per_day,
      u.name AS customer_name,
      u.email AS customer_email
    FROM bookings b
    JOIN cars c ON b.car_id = c.id
    JOIN users u ON b.customer_id = u.id
    WHERE c.agency_id = $1
    ORDER BY b.created_at DESC`,
    [req.user!.id]
  );
  res.json(result.rows);
}
