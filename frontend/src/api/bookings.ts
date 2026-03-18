import client from "./client";

export function createBooking(data: {
  car_id: number;
  start_date: string;
  num_days: number;
}) {
  return client.post("/bookings", data);
}

export function getAgencyBookings() {
  return client.get("/bookings/agency");
}
