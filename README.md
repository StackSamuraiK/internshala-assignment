# Car Rental System

A full-stack car rental application with two types of users: Customers and Car Rental Agencies. Agencies can manage their car fleet and view bookings, while customers can browse and book available cars.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS v4, Shadcn UI, Vite.
- **Backend**: Node.js, Express, TypeScript.
- **Database**: PostgreSQL (Neon).

## Features

### Authentication
- Separate registration flows for Customers and Agencies.
- Secure login for both user types using JWT.
- Role-based access control for protected routes and actions.

### Car Rental Agency
- Add new cars with details: model, vehicle number, seating capacity, and rent per day.
- Edit existing car details.
- View a list of all bookings made for their cars with customer details (name and email).

### Customer
- View all available cars for rent without needing to log in.
- If logged in, select a start date and the number of days for the rental.
- Book available cars (authenticated customers only).
- Automatic cost calculation based on days and rent per day.

## Project Structure

- `/backend`: Express API with TypeScript.
- `/frontend`: React application with Tailwind v4 and Shadcn components.

## Setup Instructions

### Database
1. Create a PostgreSQL database (e.g., on Neon).
2. Run the SQL commands in `backend/schema.sql` to set up the tables.

### Backend
1. Go to the `backend` directory: `cd backend`.
2. Install dependencies: `npm install`.
3. Create a `.env` file based on `.env.example` and add your `DATABASE_URL` and `JWT_SECRET`.
4. Run the development server: `npm run dev`.

### Frontend
1. Go to the `frontend` directory: `cd frontend`.
2. Install dependencies: `npm install`.
3. Run the development server: `npm run dev`.
4. Access the application at `http://localhost:5173`.

## Scripts

### Backend
- `npm run dev`: Compiles TypeScript and starts the server (`tsc -b && node dist/index.js`).
- `npm run build`: Compiles TypeScript.

### Frontend
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the application for production.
