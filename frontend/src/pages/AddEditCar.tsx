import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addCar, getCars, updateCar } from "@/api/cars";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Car {
  id: number;
  vehicle_model: string;
  vehicle_number: string;
  seating_capacity: number;
  rent_per_day: string;
}

export default function AddEditCar() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    getCars().then((res) => {
      const car = (res.data as Car[]).find((c: Car) => c.id === Number(id));
      if (car) {
        setVehicleModel(car.vehicle_model);
        setVehicleNumber(car.vehicle_number);
        setSeatingCapacity(String(car.seating_capacity));
        setRentPerDay(car.rent_per_day);
      }
    });

  }, [id, isEdit]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const payload = {
      vehicle_model: vehicleModel,
      vehicle_number: vehicleNumber,
      seating_capacity: Number(seatingCapacity),
      rent_per_day: Number(rentPerDay),
    };
    try {
      if (isEdit) {
        await updateCar(Number(id), payload);
      } else {
        await addCar(payload);
      }
      navigate("/cars");
    } catch {
      setError("Failed to save car. Vehicle number may already exist.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12 transition-all duration-500">
      <Card className="shadow-2xl border-border/40 glass animate-in fade-in slide-in-from-bottom-6 duration-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            {isEdit ? "Update Vehicle" : "Add New Vehicle"}
          </CardTitle>
          <CardDescription>
            {isEdit ? "Modify the details of your listed vehicle" : "Fill in the details to list a new car in your fleet"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20 animate-in fade-in zoom-in duration-300">
                {error}
              </div>
            )}
            <div className="grid gap-5">
              <div className="space-y-2">
                <Label htmlFor="model">Vehicle Model</Label>
                <Input
                  id="model"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  placeholder="e.g. Toyota Innova Hycross"
                  required
                  className="bg-background/50 focus:bg-background transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Vehicle Number</Label>
                <Input
                  id="number"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  placeholder="e.g. MH 12 AB 1234"
                  required
                  className="bg-background/50 font-mono focus:bg-background transition-all uppercase"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="seats">Seating Capacity</Label>
                  <Input
                    id="seats"
                    type="number"
                    min={1}
                    max={50}
                    value={seatingCapacity}
                    onChange={(e) => setSeatingCapacity(e.target.value)}
                    required
                    className="bg-background/50 focus:bg-background transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rent">Rent per Day (₹)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
                    <Input
                      id="rent"
                      type="number"
                      min={1}
                      step="0.01"
                      value={rentPerDay}
                      onChange={(e) => setRentPerDay(e.target.value)}
                      required
                      className="bg-background/50 pl-7 focus:bg-background transition-all font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Button type="submit" className="flex-1 h-11" disabled={loading}>
                {loading ? "Saving..." : isEdit ? "Update Vehicle Details" : "Add to Fleet"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 px-6"
                onClick={() => navigate("/cars")}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>

  );
}
