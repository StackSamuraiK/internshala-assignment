import axios from "axios";
import { BACKEND_URL } from "@/config";

const client = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});


client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default client;
