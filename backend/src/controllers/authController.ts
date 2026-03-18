import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db/pool";

async function registerWithRole(
  role: "customer" | "agency",
  req: Request,
  res: Response
) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
      [name, email, hashed, role]
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (err: unknown) {
    const error = err as { code?: string };
    if (error.code === "23505") {
      res.status(409).json({ message: "Email already registered" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
}

export async function registerCustomer(req: Request, res: Response) {
  await registerWithRole("customer", req, res);
}

export async function registerAgency(req: Request, res: Response) {
  await registerWithRole("agency", req, res);
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  const user = result.rows[0];
  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
}
