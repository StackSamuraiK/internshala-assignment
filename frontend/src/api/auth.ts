import client from "./client";

export function loginUser(email: string, password: string) {
  return client.post("/auth/login", { email, password });
}

export function registerCustomer(name: string, email: string, password: string) {
  return client.post("/auth/register/customer", { name, email, password });
}

export function registerAgency(name: string, email: string, password: string) {
  return client.post("/auth/register/agency", { name, email, password });
}
