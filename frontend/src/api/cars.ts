import client from "./client";

export function getCars() {
  return client.get("/cars");
}

export function addCar(data: {
  vehicle_model: string;
  vehicle_number: string;
  seating_capacity: number;
  rent_per_day: number;
}) {
  return client.post("/cars", data);
}

export function updateCar(
  id: number,
  data: {
    vehicle_model: string;
    vehicle_number: string;
    seating_capacity: number;
    rent_per_day: number;
  }
) {
  return client.put(`/cars/${id}`, data);
}
