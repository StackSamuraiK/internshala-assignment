import { Request, Response } from "express";
import pool from "../db/pool";
import { AuthRequest } from "../middleware/auth";

export async function getCars(_req: Request, res: Response) {
  const result = await pool.query(
    "SELECT * FROM cars ORDER BY created_at DESC"
  );
  res.json(result.rows);
}

export async function addCar(req: AuthRequest, res: Response) {
  const { vehicle_model, vehicle_number, seating_capacity, rent_per_day } =
    req.body;
  if (!vehicle_model || !vehicle_number || !seating_capacity || !rent_per_day) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    const result = await pool.query(
      "INSERT INTO cars (agency_id, vehicle_model, vehicle_number, seating_capacity, rent_per_day) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [req.user!.id, vehicle_model, vehicle_number, seating_capacity, rent_per_day]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: unknown) {
    const error = err as { code?: string };
    if (error.code === "23505") {
      res.status(409).json({ message: "Vehicle number already exists" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
}

export async function updateCar(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const { vehicle_model, vehicle_number, seating_capacity, rent_per_day } =
    req.body;

  const check = await pool.query(
    "SELECT agency_id FROM cars WHERE id = $1",
    [id]
  );
  if (check.rows.length === 0) {
    res.status(404).json({ message: "Car not found" });
    return;
  }
  if (check.rows[0].agency_id !== req.user!.id) {
    res.status(403).json({ message: "You do not own this car" });
    return;
  }

  try {
    const result = await pool.query(
      "UPDATE cars SET vehicle_model = $1, vehicle_number = $2, seating_capacity = $3, rent_per_day = $4 WHERE id = $5 RETURNING *",
      [vehicle_model, vehicle_number, seating_capacity, rent_per_day, id]
    );
    res.json(result.rows[0]);
  } catch (err: unknown) {
    const error = err as { code?: string };
    if (error.code === "23505") {
      res.status(409).json({ message: "Vehicle number already exists" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
}
